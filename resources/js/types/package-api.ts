import { Image } from "./image"

export interface Package {
    id: number
    name: string
    description: string
    base_price: number
    duration: number
    destination: string
    tag: string | null
    slug: string
    primary_image: Image | null
    created_at: string
    updated_at: string
}



export interface PackageFilter {
    priceRange?: PriceRange
    isForeignOnly?: boolean
    destination?: string
    name?: string
    perPage?: number
    page?: number
    groupID?: number
}


export interface PriceRange {
    min: number
    max: number
}