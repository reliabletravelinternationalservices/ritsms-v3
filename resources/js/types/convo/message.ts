
export enum Type {
    Text = 'text',
    Image = 'image',
    Video = 'video',
    File = 'file',
    System = 'system'
}

export interface MessageGroup {
    id: number
    sender: User | null
    sent_at: string | null
    messages: Message[]
}

export interface Message {
    id: number
    client_id: string | null
    sender: User | null
    body: string | null
    type: Type
    reply_to: ReplyMessage | null
    sent_at: string | null
    is_edited: boolean
    is_read: boolean
    deleted_at: string | null
}

export interface ReplyMessage {
    id: number
    body: string | null
    type: Type
    sender: User | null
    sent_at: string | null
    deleted_at: string | null
}

export interface User {
    id: number;
    avatar?: string;
    display_name: string;
    role: 'admin' | 'agent' | 'client';
}

export type MessagePosition = 'single' | 'first' | 'middle' | 'last'