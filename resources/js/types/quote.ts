

export interface Quote {
    id: number;
    code: string;
    slug: string;
    status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'Expired' | 'Cancelled';
    valid_until?: string | null;
    subtotal: number;
    discount_total: number;
    tax_total:number;
    grand_total:number;
    notes?: string | null;
    sent_at?: string | null;
    viewed_at?: string | null;
    accepted_at?: string | null;
    created_at: string;
    updated_at: string;
}


export interface Guest {
    guest_id: number;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
}


export interface Client {
    id: number;
    code: string;
    slug: string;
    name: string;
    email: string;
    phone: string;
}



export type QuoteWithClient = Quote & { client?: Client | null }

export type QuoteWithGuest = Quote & { guest?: Guest | null }


export type QuoteWithClientAndGuest = QuoteWithClient & { guest?: Guest | null }