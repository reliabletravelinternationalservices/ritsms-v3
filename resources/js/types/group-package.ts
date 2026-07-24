import { Media } from "./media";
import { Package } from "./package-api";

export interface PackageGroup {
    id: number;
    title: string;
    description: string | null;
    include_as_outbound: boolean;
    include_as_inbound: boolean;
    is_featured: boolean;
    tag: string | null;
    image: Media;
    slug: string;
}



export type PackageGroupWithPackages = PackageGroup & {
    packages?: Package[];
}


