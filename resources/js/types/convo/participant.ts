export enum Role {
    Admin='admin',
    Owner='owner',
    Member='member'
}

export interface Participant {
    id:number
    participant: User
    role: Role
    joined_at: string
    left_at: string | null
    last_read_at: string | null
    total_unread: number
}

export interface User {
    id: number;
    avatar?: string;
    display_name: string;
    role: 'admin' | 'agent' | 'client';
}