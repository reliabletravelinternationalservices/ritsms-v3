export type BookingStatus =
    | 'pending'
    | 'confirmed'
    | 'in_progress'
    | 'cancelled'
    | 'completed'

export interface Booking {
    // References
    client_id?: number| null;
    quotation_id?: number| null;

    // Booking identification
    code: string;
    slug: string;
    status: BookingStatus;

    // Client snapshot
    primary_client_code: string;
    primary_client_name: string;
    primary_client_email: string;
    primary_client_phone: string;

    // Tour references
    tour_id: number;
    tour_departure_id: number | null;

    // Tour snapshot
    tour_code: string;
    tour_name: string;
    tour_duration: number;

    // Travel dates
    departure_date: string;
    return_date: string;

    // Flight / travel details
    departure_time: string | null;
    return_time: string | null;
    airline_name: string | null;
    departure_flight_no: string | null;
    return_flight_no: string | null;

    // Travelers
    total_pax: number;

    // Pricing snapshot
    subtotal: number;
    discount_total: number;
    tax_total: number;
    grand_total: number;

    // Notes
    remarks: string | null;
    notes: string | null;

    // Timestamps
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}