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
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    terms_and_conditions: string[];
    notes: string | null;
    deleted_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}