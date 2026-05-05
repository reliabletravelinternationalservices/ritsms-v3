export interface Media {
    id: number;
    mediable_id: number;
    mediable_type: string;
    file_name: string;
    file_path: string;
    url: string;
    disk: string;
    type: string;
    mime_type: string;
    size: number;
    alt_text?: string;
    order_number: number;
    is_primary: boolean;
    created_at: string;
    updated_at: string;
}

export interface Package {
    id: number;
    name: string;
    tag?: string;
    description: string;
    base_price: number;
    down_payment: number;
    duration: number;
    selling_start_date: string;
    selling_end_date?: string;
    highlights_array?: string[];
    itineraries_array: Array<{
        day: number;
        activity: string;
    }>;
    inclusions_array: string[];
    exclusions_array: string[];
    notes_array: string[];
    destination: string;
    season: 'spring' | 'winter' | 'autumn' | 'summer';
    is_featured: boolean;
    is_foreign_only?: boolean;
    primary_image?: Media;
    schedules: PackageSchedule[];
    created_at: string;
    updated_at: string;
}



export interface PackageSchedule {
    id: number;
    package_id: number;
    departure_date: string;
    return_date: string;
    price: number;
    is_available: boolean;
    is_limited: boolean;
}

export interface PackageGroup {
    id: number;
    title: string;
    description: string;
    include_as_outbound: boolean;
    include_as_inbound: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface PackageGroupItems {
    package_group_id: number;
    package_id: number;
    order_number: number;
}
