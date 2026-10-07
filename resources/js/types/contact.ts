export interface Contact{
        index: number;
        id: number;
        name: string;
        email: string;
        type: 'admin' | 'client' | 'agent';
        initials?: string | null;
    }