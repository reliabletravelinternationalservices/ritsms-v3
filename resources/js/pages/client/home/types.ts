import { Destination } from "@/types/destination";
import { Package } from "@/types/package";

interface PackageResult {
    packages: Package[];
}



export interface ClassProps {
    class?: string
}


export interface ImageProps {
  id: number
  src: string
  alt?: string
}





export interface ServiceProps {
    id: number,
    name: string,
    description: string,
    icon: string
}