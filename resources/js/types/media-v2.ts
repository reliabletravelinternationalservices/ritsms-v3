
export interface Media {
    id: number
    file_name: string
    file_path: string
    type: 'image' | 'video' | 'document' | 'audio'
    collection: string
    mime_type?: string
    alt_text?: string
    size:number;
    order_number: number
}



export interface MediaAsset {
  key: string
  status: 'new' | 'existing'
  file: File | Media
}