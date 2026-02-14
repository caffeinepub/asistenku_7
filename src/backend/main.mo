import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  type TicketId = Nat;
  type TicketStatus = { #open; #inProgress; #resolved; #closed };

  type Ticket = {
    id : TicketId;
    creator : Principal;
    targetRole : AccessControl.UserRole;
    status : TicketStatus;
    description : Text;
  };

  type WithdrawStatus = { #pending; #approved; #rejected };
  type WithdrawRequest = {
    id : Nat;
    creator : Principal;
    amount : Nat;
    status : WithdrawStatus;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    role : Text;
    isActive : Bool;
  };

  public type PartnerProfile = {
    userId : Principal;
    ratePerHour : Nat;
    skills : [Text];
    isActive : Bool;
  };

  public type ClientProfile = {
    userId : Principal;
    company : Text;
    isActive : Bool;
  };

  public type Layanan = {
    id : Nat;
    name : Text;
    description : Text;
    createdBy : Principal;
  };

  public type Task = {
    id : Nat;
    title : Text;
    assignedTo : Principal;
    status : Text;
  };

  // State
  stable var superadminPrincipal : ?Principal = null;
  let tickets = Map.empty<TicketId, Ticket>();
  let withdrawRequests = Map.empty<Nat, WithdrawRequest>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let partnerProfiles = Map.empty<Principal, PartnerProfile>();
  let clientProfiles = Map.empty<Principal, ClientProfile>();
  let layananById = Map.empty<Nat, Layanan>();
  let tasks = Map.empty<Nat, Task>();

  var nextTicketId = 1;
  var nextWithdrawId = 1;
  var nextLayananId = 1;
  var nextTaskId = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query func hasSuperadmin() : async Bool {
    switch (superadminPrincipal) {
      case (null) { false };
      case (_) { true };
    };
  };

  public query func getSuperadminPrincipal() : async ?Principal {
    superadminPrincipal;
  };

  public shared ({ caller }) func claimSuperadmin() : async Bool {
    switch (superadminPrincipal) {
      case (null) {
        superadminPrincipal := ?caller;
        true;
      };
      case (_) { false };
    };
  };

  // User Profile Methods
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper to check if internal user is active
  func requireActiveForInternal(caller : Principal) {
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        if (not profile.isActive) {
          Runtime.trap("Unauthorized: User account is not active");
        };
      };
    };
  };

  // Ticket Methods
  public shared ({ caller }) func createTicket(description : Text, targetRole : AccessControl.UserRole) : async TicketId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create tickets");
    };
    requireActiveForInternal(caller);

    let ticket : Ticket = {
      id = nextTicketId;
      creator = caller;
      targetRole;
      status = #open;
      description;
    };
    tickets.add(nextTicketId, ticket);
    nextTicketId += 1;
    ticket.id;
  };

  public shared ({ caller }) func updateTicketStatus(ticketId : TicketId, newStatus : TicketStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update tickets");
    };
    requireActiveForInternal(caller);

    switch (tickets.get(ticketId)) {
      case (null) { Runtime.trap("Ticket not found") };
      case (?ticket) {
        if (not checkTicketUpdatePermission(ticket, caller)) {
          Runtime.trap("Unauthorized to update this ticket");
        };
        let updatedTicket = { ticket with status = newStatus };
        tickets.add(ticketId, updatedTicket);
      };
    };
  };

  public query ({ caller }) func listMyTickets() : async [Ticket] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can list tickets");
    };
    let filtered = tickets.values().filter(
      func(ticket) { ticket.creator == caller }
    );
    filtered.toArray();
  };

  public query ({ caller }) func listTicketsByTargetRole(role : AccessControl.UserRole) : async [Ticket] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can list tickets");
    };
    requireActiveForInternal(caller);

    let filtered = tickets.values().filter(
      func(ticket) { ticket.targetRole == role }
    );
    filtered.toArray();
  };

  public query ({ caller }) func listAllTickets() : async [Ticket] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all tickets");
    };
    tickets.values().toArray();
  };

  // Withdraw Methods
  public shared ({ caller }) func createWithdrawRequest(amount : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create withdraw requests");
    };
    requireActiveForInternal(caller);

    // Get partner profile to check minimum withdraw amount
    let partnerProfile = switch (partnerProfiles.get(caller)) {
      case (null) { Runtime.trap("Partner profile not found") };
      case (?profile) { profile };
    };

    if (not partnerProfile.isActive) {
      Runtime.trap("Unauthorized: Partner account is not active");
    };

    let minWithdrawAmount = partnerProfile.ratePerHour * 10;
    if (amount < minWithdrawAmount) {
      Runtime.trap("Amount below minimum allowed");
    };

    let request : WithdrawRequest = {
      id = nextWithdrawId;
      creator = caller;
      amount;
      status = #pending;
    };
    withdrawRequests.add(nextWithdrawId, request);
    nextWithdrawId += 1;
    request.id;
  };

  public shared ({ caller }) func updateWithdrawStatus(requestId : Nat, newStatus : WithdrawStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update withdraw status");
    };

    switch (withdrawRequests.get(requestId)) {
      case (null) { Runtime.trap("Withdraw request not found") };
      case (?request) {
        let updatedRequest = { request with status = newStatus };
        withdrawRequests.add(requestId, updatedRequest);
      };
    };
  };

  public query ({ caller }) func listMyWithdrawRequests() : async [WithdrawRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can list withdraw requests");
    };
    let filtered = withdrawRequests.values().filter(
      func(request) { request.creator == caller }
    );
    filtered.toArray();
  };

  public query ({ caller }) func listAllWithdrawRequests() : async [WithdrawRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all withdraw requests");
    };
    withdrawRequests.values().toArray();
  };

  // Stats Method
  public query ({ caller }) func getStats() : async {
    totalUsers : Nat;
    totalClients : Nat;
    totalPartners : Nat;
    totalLayanan : Nat;
    totalTasks : Nat;
    totalTicketsOpen : Nat;
    totalWithdrawPending : Nat;
  } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };

    let totalUsers = userProfiles.size();
    let totalClients = clientProfiles.size();
    let totalPartners = partnerProfiles.size();
    let totalLayanan = layananById.size();
    let totalTasks = tasks.size();

    var totalTicketsOpen = 0;
    for (ticket in tickets.values()) {
      switch (ticket.status) {
        case (#open) { totalTicketsOpen += 1 };
        case (_) {};
      };
    };

    var totalWithdrawPending = 0;
    for (request in withdrawRequests.values()) {
      switch (request.status) {
        case (#pending) { totalWithdrawPending += 1 };
        case (_) {};
      };
    };

    {
      totalUsers;
      totalClients;
      totalPartners;
      totalLayanan;
      totalTasks;
      totalTicketsOpen;
      totalWithdrawPending;
    };
  };

  // Validation helpers
  func checkTicketUpdatePermission(ticket : Ticket, caller : Principal) : Bool {
    if (ticket.creator == caller) { return true };
    let role = AccessControl.getUserRole(accessControlState, caller);
    role == ticket.targetRole or AccessControl.isAdmin(accessControlState, caller);
  };
};
