import { Destination } from "@/types/destination";
import { PackageGroup } from "@/types/group-package";

export interface OutbounPageProps {
    'countries' : string[],
    'featured' : PackageGroup[],
    'regular' : PackageGroup[],
}

