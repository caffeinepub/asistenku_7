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

  public type UserRow = {
    userId : Principal;
    profile : UserProfile;
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

  // Allowed roles constant array for validation
  let allowedRoles = [
    "superadmin",
    "admin",
    "concierge",
    "strategicpartner",
    "manajer",
    "finance",
    "management",
    "asistenmu",
    "client",
    "partner",
  ];

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

  // Superadmin role check
  public query ({ caller }) func isSuperadmin() : async Bool {
    switch (superadminPrincipal, caller) {
      case (?superadmin, admin_caller) { superadmin == admin_caller };
      case (_) { false };
    };
  };

  // Role check and status verification
  public query ({ caller }) func checkRoleAndStatus() : async { role : Text; isActive : Bool } {
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        { role = profile.role; isActive = profile.isActive };
      };
    };
  };

  // List all users - Restricted to SUPERADMIN only (not even admins)
  public query ({ caller }) func listAllUsers() : async [UserRow] {
    switch (superadminPrincipal) {
      case (?superadmin) {
        if (caller == superadmin) {
          return userProfiles.toArray().map(func((userId, profile)) { { userId; profile } });
        } else {
          Runtime.trap("Unauthorized: Only superadmin can list all users");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Only superadmin can list all users");
      };
    };
  };

  // Set user active status - implementation per requirements
  public shared ({ caller }) func setUserActiveStatus(target : Principal, active : Bool) : async Bool {
    // Check if superadmin has been claimed
    switch (superadminPrincipal) {
      case (null) {
        Runtime.trap("Superadmin role must be claimed first");
      };
      case (?superadmin) {
        // Check if caller is the superadmin
        if (caller != superadmin) {
          Runtime.trap("Only superadmin can change active status for other users");
        };
        // Check if target is the superadmin (cannot change superadmin's own status)
        if (target == superadmin) {
          Runtime.trap("Superadmin status cannot be changed");
        };
        // Check if target user profile exists
        switch (userProfiles.get(target)) {
          case (null) { 
            Runtime.trap("Target user profile not found") 
          };
          case (?entry) {
            // Update the target user's isActive flag
            let updatedProfile = { 
              name = entry.name;
              email = entry.email;
              role = entry.role;
              isActive = active 
            };
            userProfiles.add(target, updatedProfile);
            return true;
          };
        };
      };
    };
  };

  // User Profile Methods
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    // Validate requested role against allowed roles list
    let isValidRole = allowedRoles.any(func(allowedRole) { allowedRole == profile.role });
    if (not isValidRole) {
      Runtime.trap("Invalid role: Requested role is not allowed");
    };

    // For self-registration, always set isActive to false (pending/nonactive)
    let newProfile = {
      name = profile.name;
      email = profile.email;
      role = profile.role;
      isActive = false;
    };

    userProfiles.add(caller, newProfile);
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
