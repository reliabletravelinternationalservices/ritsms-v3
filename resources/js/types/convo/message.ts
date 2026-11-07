
export enum Type {
    Text = 'text',
    Image = 'image',
    Video = 'video',
    File = 'file',
    System = 'system'
}

export interface Message {
    id:number
    sender: User | null
    body: string | null
    type: Type
    reply_to: Message | null
    sent_at: string | null
    is_edited: boolean
    is_read: boolean;
    deleted_at: string | null
}


export interface User {
    id: number;
    avatar?: string;
    display_name: string;
    role: 'admin' | 'agent' | 'client';
}