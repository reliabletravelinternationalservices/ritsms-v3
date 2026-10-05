

export type Mode = 'chats' | 'sessions'
export type Sender = 'me' | 'them'
export type Status = 'online' | 'away' | 'offline'


// ===========================================


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
    status?: 'sending' | 'sent' | 'failed'
    state?: 'unread' | 'read'
}


export type MessageWithSessionUIID = Message & {
    uuid: string
}


export type ChatSessionWithLatestMessage = ChatSession & {
    latest_message: Message | null
    new_messages_count: number
}





// CONVERSATION
export interface ChatConversation {
    id: number;
    name?: string | null;
    avatar?: string | null;
    last_message_at?: string | null;
    is_turned_over: boolean;
    turned_over_at?: string | null;
}


