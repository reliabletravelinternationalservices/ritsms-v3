import { Destination } from "@/types/destination";
import { DestinationLocation } from "@/types/destination-location";
import { Media } from "@/types/media";

export interface DestinationProps {
    destination: Destination
}

export interface LocationProps {
  locations: DestinationLocation[];
}

export interface TitleHeaderProps {
  title: string;
  description: string;
  image?: Media;
}

