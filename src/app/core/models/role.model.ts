export enum UserRole {
    REQUESTER = 'REQUESTER',
    REVIEWER = 'REVIEWER',
    ADMIN = 'ADMIN',
    APPROVER = 'APPROVER'
}

export interface RoleOption {
    label: string;
    role: UserRole;
}