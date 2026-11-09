import { ConvoWithParticipantsAndLatestMessage } from "../convo/conversation";

export interface Contact {
    id: number;
    email: string;
    avatar?: string;
    display_name: string;
    phone: string | null;
    role: 'admin' | 'agent' | 'client';
    private_conversation: ConvoWithParticipantsAndLatestMessage;
}

