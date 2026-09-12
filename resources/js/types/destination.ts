import { DestinationLocation } from "./destination-location";
import { Media } from "./media";
export interface Destination {
    id: number;
    title: string;
    description: string;
    tag?: string;
    country: string;
    image?: Media;
}

export type DestinationWithLocations = Destination & {
    locations: DestinationLocation[];

}