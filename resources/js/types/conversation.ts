export enum MessageType {
    Text = 'text',
    Image = 'image',
    File = 'file',
    System = 'system',
}


export interface ChatConversation{
    id: number;
    name: string;

}


export interface Message {
    id: number;
    chat_conversation_id: number;
    message: string;
    type: MessageType;
    sender_id: number | null;
    sender_type: string | null;
    created_at: string;
    updated_at: string;
    reads: Reader[]
}


export type ChatConvoWithLatestMessage = ChatConversation & {
    latest_message: Message
    unread_messages_count: number
}


export interface Reader {
    chat_conversation_message_id: number;
    created_at: string | null;
    id:number;
    read_at: string;
    reader_id: number;
    reader_type: string;
    updated_at: string | null;
}