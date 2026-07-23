import { Image } from "./image"


export interface Country {
    id: number
    mediable_id: number
    mediable_type: string
    country: string
    tag: string | null
    locations_count: number
    image: Image | null
}



export type CountryWithLocations = Country & {
    locations: Location[]
}



export interface Location {
    id: number
    name: string
    image: Image | null
    description: string
}


export interface CountryFilter {
    countryName?: string
    with?: {
        locations?: boolean
    }
    perPage?: number
}