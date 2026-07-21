import { Media } from "./media";


export interface Package {
    id: number;
    name: string;
    tag?: string;
    description: string;
    base_price: number;
    down_payment: number;
    duration: number;
    selling_start_date?: string;
    selling_end_date: string;
    highlights_array?: string[];
    itineraries_array: Array<{
        day: number;
        title: string;
        activity: string[];
    }>;
    inclusions_array: string[];
    exclusions_array: string[];
    notes_array: string[];
    destination: string;
    season: string
    is_featured: boolean;
    is_foreign_only?: boolean;
    primary_image?: Media;
    images?: Media[];
    schedules: PackageSchedule[];
    slug: string;
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




