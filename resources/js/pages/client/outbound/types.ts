import { PackageGroup } from "@/types/group-package";

export interface OutbounPageProps {
    'countries' : string[],
    'featured' : PackageGroup[],
    'regular' : PackageGroup[],
}

export interface InboundPageProps {
    'locations' : string[],
    'featured' : PackageGroup[],
    'regular' : PackageGroup[],
}

export interface FilterState {
  country: string;
  season: string;
  duration: number | null;
}

export interface Option {
  label: string;
  value: string | number | null;
}

export interface UseFilteringPackagesProps {
  countries: string[];
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}