import { Media } from "@/types/media"
import { Package } from "@/types/package"

export interface GroupDetailHeaderProps {
  id: number;
  title: string;
  description?: string | null;
  image?: Media;
  isInbound: boolean;
}







// PACKAGE

export interface PackageDetailProps {
    package: Package;
    isInbound: boolean;
}