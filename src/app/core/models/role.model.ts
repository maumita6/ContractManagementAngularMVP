export enum UserRole {
    REVIEWER = 'REVIEWER',
    ADMIN = 'ADMIN',
    APPROVER = 'APPROVER'
}

export interface RoleOption {
    label: string;
    role: UserRole;
}