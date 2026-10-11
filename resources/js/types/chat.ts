

export type Mode = 'chats' | 'sessions'
export type Sender = 'me' | 'them'
export type Status = 'online' | 'away' | 'offline'


// ===========================================



export interface StoredSession {
    uuid: string;
    token: string;
}

export interface ValidationResponse {
    is_valid: boolean;
    message: string;
}

export interface ChatSession {
    id: number;
    uuid: string;
    code: string;
    status: 'open' | 'closed';
}

export type ChatSessionWithToken = ChatSession & {
    token: string;
}


export interface Message {
    id: number | string
    message: string
    created_at: string
    sender_type: 'session' | 'admin'
    status: 'sending' | 'sent' | 'delivered' | 'failed'
    state: 'unread' | 'read'
}


export type MessageWithSessionUUID = Message & {
    uuid: string
}


export type ChatSessionWithLatestMessage = ChatSessionWithToken & {
    latest_message: Message | null
    new_messages_count: number
}




