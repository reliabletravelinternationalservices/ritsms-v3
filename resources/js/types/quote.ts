import { Client } from "./client";
import { Departure, Tour } from "./tour";


export type QuotationStatus =
    | 'draft'
    | 'sent'
    | 'viewed'
    | 'accepted'
    | 'rejected'
    | 'expired'
    | 'cancelled'

export type QuotationItemType =
    | 'tour'
    | 'hotel'
    | 'flight'
    | 'visa'
    | 'insurance'
    | 'transport'
    | 'fee'
    | 'other'

export interface Quote {
    id: number;
    client: Client;
    tour: Tour;
    tour_id: number;
    tour_name: string;
    tour_duration: number;
    departure: Departure;
    tour_departure_id: number;
    departure_date: string;
    return_date: string;
    total_pax: number;
    code: string;
    slug: string;
    status: QuotationStatus;
    valid_until?: string | null;
    subtotal: number;
    discount_total: number;
    tax_total:number;
    grand_total:number;
    notes?: string | null;
    sent_at?: string | null;
    viewed_at?: string | null;
    accepted_at?: string | null;
    items: QuoteItem[];
    deleted_at?: string | null;
    created_at: string;
    updated_at: string;
}



export interface QuoteItem {
    id: number;
    quotation_id: number;
    item_type: QuotationItemType;
    title: string;
    desciption: string;
    details: string;

    quantity: number;
    unit_price: number;
    discount: number;
    tax: number;
    total: number;

    remarks: Text;
    sort_order: number;
    deleted_at?: string | null;
    created_at: string;
    updated_at: string;
}