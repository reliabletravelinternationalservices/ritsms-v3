export interface Contact{
        code: string;
        name: string;
        email: string;
        contact_type: 'client' | 'agent';
        initials?: string | null;
    }