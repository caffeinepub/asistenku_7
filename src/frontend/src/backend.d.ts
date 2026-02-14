import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Ticket {
    id: TicketId;
    status: TicketStatus;
    creator: Principal;
    description: string;
    targetRole: UserRole;
}
export interface WithdrawRequest {
    id: bigint;
    status: WithdrawStatus;
    creator: Principal;
    amount: bigint;
}
export type TicketId = bigint;
export interface UserProfile {
    name: string;
    role: string;
    isActive: boolean;
    email: string;
}
export enum TicketStatus {
    resolved = "resolved",
    closed = "closed",
    open = "open",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WithdrawStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimSuperadmin(): Promise<boolean>;
    createTicket(description: string, targetRole: UserRole): Promise<TicketId>;
    createWithdrawRequest(amount: bigint): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStats(): Promise<{
        totalTasks: bigint;
        totalTicketsOpen: bigint;
        totalClients: bigint;
        totalPartners: bigint;
        totalUsers: bigint;
        totalWithdrawPending: bigint;
        totalLayanan: bigint;
    }>;
    getSuperadminPrincipal(): Promise<Principal | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasSuperadmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listAllTickets(): Promise<Array<Ticket>>;
    listAllWithdrawRequests(): Promise<Array<WithdrawRequest>>;
    listMyTickets(): Promise<Array<Ticket>>;
    listMyWithdrawRequests(): Promise<Array<WithdrawRequest>>;
    listTicketsByTargetRole(role: UserRole): Promise<Array<Ticket>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateTicketStatus(ticketId: TicketId, newStatus: TicketStatus): Promise<void>;
    updateWithdrawStatus(requestId: bigint, newStatus: WithdrawStatus): Promise<void>;
}
