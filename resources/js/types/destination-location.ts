import { Media } from "./media";
export interface DestinationLocation {
    id: number;
    name: string;
    description: string;
    destination_id?: number;
    map_link?: string;

    image: Media;
    created_at: string;
    updated_at: string;
}