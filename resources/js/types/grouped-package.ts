import { Package } from "./package-api"

export interface GroupedPackage {
    id: number
    title: string
    tag: string | null
    description: string
    include_as_outbound: boolean
    include_as_inbound: boolean
    is_featured: boolean
    packages: Package[]
}

export interface GroupPackageFilter {
    isInbound?: boolean
    isOutbound?: boolean
    isFeatured?: boolean
    title?: string
    perPage?: number
    page?: number
}
