import { Media } from "./media";
import { Package } from "./package";

export interface PackageGroup {
    id: number;
    title: string;
    description: string | null;
    include_as_outbound: boolean;
    include_as_inbound: boolean;
    is_featured: boolean;
    
    // Relationship
    packages?: Package[];
    image: Media;
    created_at: string;
    updated_at: string;
}