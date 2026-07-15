import { PackageGroup } from "@/types/group-package";

export interface FilterState {
  destination: string;
  season: string;
  duration: number | null;
}

export interface Option {
  label: string;
  value: string | number | null;
}


export interface UseInboundFilteringPackagesProps {
  destinationLocations: string[];
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}
