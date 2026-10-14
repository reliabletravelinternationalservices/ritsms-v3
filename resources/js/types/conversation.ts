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
    created_at: string;
    updated_at: string;
}


export type ChatConvoWithLatestMessage = ChatConversation & {
    last_message: Message
}