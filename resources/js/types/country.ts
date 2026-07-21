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