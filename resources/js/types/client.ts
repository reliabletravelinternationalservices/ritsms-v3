export type ClientType =
    | 'personal'
    | 'business'
    | 'partner'
    | 'other';

export type ClientStatus =
    | 'new'
    | 'contacted'
    | 'qualified'
    | 'quotation_sent'
    | 'booked'
    | 'completed'
    | 'unresponsive'
    | 'cancelled'
    | 'disqualified';

export type ClientSource =
    | 'website'
    | 'manual'
    | 'gmail'
    | 'walk_in'
    | 'google_ads'
    | 'facebook'
    | 'instagram'
    | 'tiktok'
    | 'youtube'
    | 'other';

export type ClientGender =
    | 'male'
    | 'female'
    | 'transgender'
    | 'lesbian'
    | 'other';

export interface Client {
    id: number;
    code: string;
    slug: string;

    name: string;
    email: string;
    phone: string | null;
    address: string | null;

    status: ClientStatus;
    source: ClientSource;
    gender: ClientGender | null;

    accept_marketing: boolean;

    website_link: string | null;
    facebook_link: string | null;

    last_contacted_at: string | null;

    note: string | null;

    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}