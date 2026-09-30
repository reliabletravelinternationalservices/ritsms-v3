export interface SessionChat {
    uuid: string
    id: string
    name: string
    initials: string
    message: string
    time: string
    unread?: number
    status: 'online' | 'away' | 'offline'
    type: 'session'
}

export interface ChatMessage {
    id: number
    sender: 'me' | 'them'
    content: string
    time: string
}

export type Mode = 'chat' | 'session'
export type Sender = 'me' | 'them'
export type Status = 'online' | 'away' | 'offline'


export interface ChatCardData {
    id: number | string
    name: string
    initials: string
    message: string
    time: string
    unread?: number
    status?: Status
    type?: Mode
    lastSender?: Sender
}




// ===========================================


export interface ChatSession {
    uuid: string;
    code: string;
    status: 'open' | 'closed';
}

export type ChatSessionWithToken = ChatSession & {
    token: string;
}


export interface Message {
    id: number
    message: string
    created_at: string
    sender: 'session' | 'admin'
}
