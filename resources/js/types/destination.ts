import { DestinationLocation } from "./destination-location";
import { Media } from "./media";
export interface Destination {
    id: number;
    title: string;
    description: string;
    tag?: string;
    country: string;
    locations: DestinationLocation[];
    image: Media;
    created_at: string;
    updated_at: string;
}