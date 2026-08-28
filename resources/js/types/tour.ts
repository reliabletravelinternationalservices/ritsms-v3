export interface Tour {
    id: number;
    code: string;
    slug: string;
    name: string;
    badge?: string | null;    
    description: string;
    category: 'domestic' | 'inbound' | 'outbound';
    itinerary_type: 'round_trip' | 'tri_city' | 'multi_city' | 'one_way';
    tour_type: 'regular' | 'private' | 'custom' | 'group';
    state: 'draft' | 'published' | 'archived';
    visibility: 'public' | 'private';
    duration: number;
    highlights: string;
    inclusions: string;
    exclusions: string;
    terms_and_conditions: string;
    booking_deadline?: string | null;
    notes: string | null;
    deleted_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

export interface Itinerary {
    id: number;
    tour_id: number;
    day_no: number;
    title: string;
    activities: string;
    deleted_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}


export interface Route {
    id: number;
    tour_id: number;
    departure_country_id: number;
    destination_country_id: number;
    departure_city: string;
    destination_city: string;
    sequence: number;
    deleted_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

export interface Hotel {
    id: number;
    tour_id: number;
    name:  string;
    rate: number;
    link?: string | null
}

export interface Departure {
    tour_id:number;
    base_price: number;
    discounted_price?: number | null;
    min_pax: number;
    max_pax?: number | null;
    departure_date: string
    return_date: string;
    airline_name: string;
    departure_flight_no: string;
    return_flight_no: string;
    is_active: boolean;
}

export type TourWithRelationshipTables = Tour & {
    itineraries: Itinerary[];
    routes:  Route[];
    hotels:  Hotel[];
    departures: Departure[];
};

