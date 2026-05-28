export interface Inquiry {
    id: number;
    fullname: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'pending' | 'resolved' | 'dismissed';
    created_at: string;
}
