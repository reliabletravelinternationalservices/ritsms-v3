export interface Contact {
    id: number;
    email: string;
    avatar?: string;
    display_name: string;
    phone: string | null;
    role: 'admin' | 'agent' | 'client';
    has_existing_private_convo: boolean;
}

