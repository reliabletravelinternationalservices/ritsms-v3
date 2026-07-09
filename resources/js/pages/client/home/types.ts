import { Destination } from "@/types/destination";
import { Package } from "@/types/package";

interface PackageResult {
    packages: Package[];
}

export interface LandingPageProps {
    destinations: Destination[];
    inbound: PackageResult;
    outbound: PackageResult;
}


export interface CarouselSectionProps {
  packages?: Package[],
  tag?: string | null,
}