import { Message } from "./message"
import { Participant } from "./participant"

export enum Type {
    Group = 'group',
    Private = 'private'
}

export interface Conversation {
    id: number
    type: Type
    name: string | null
    avatar: string | null
    created_by: User
    created_at: string
    deleted_at: string | null
}


export interface User {
    id: number;
    avatar?: string;
    display_name: string;
    role: 'admin' | 'agent' | 'client';
}


export type ConvoWithParticipants = Conversation & {
    participants: Participant[]
}

export type ConvoWithParticipantsAndLatestMessage = ConvoWithParticipants & {
    latest_message: Message
}

