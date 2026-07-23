import { Destination } from "@/types/destination";
import { Media } from "@/types/media";

export interface DestinationProps {
    destinations: Destination[];
}

export interface TitleHeaderProps {
  title: string;
  description: string;
  image?: string;
}

