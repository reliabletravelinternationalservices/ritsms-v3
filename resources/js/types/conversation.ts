export type ChatFilter = 'all' | 'unread' | 'groups';

export type MessageState = 'unread' | 'read';

export interface Participant {
    id: number;
    type: string;
    name: string;
    avatar?: string | null;
}

export interface Attachment {
    id: number;
    type: 'image' | 'file' | 'link';
    name?: string | null;
    url: string;
    mime_type?: string | null;
    size?: number | null;
}

export interface Message {
    id: number;
    conversation_id: number;
    sender_id: number;
    sender_type?: string;
    message: string;
    state: MessageState;
    created_at: string;

    sender?: Participant;
    attachments?: Attachment[];
}

export interface Conversation {
    id: number;
    name?: string | null;
    avatar?: string | null;
    last_message_at?: string | null;

    participants?: Participant[];

    last_message?: Message | null;

    unread_count?: number;

    is_group?: boolean;
}

