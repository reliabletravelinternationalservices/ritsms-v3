export interface Media {
    id: number;
    mediable_id: string | number;
    mediable_type: string;
    file_name: string;
    file_path: string;
    url: string | null;
    disk: 'local' | 'cloudinary' | 's3';
    type: 'image' | 'video' | 'document' | 'audio';
    mime_type: string | null;
    size: number | null;
    alt_text: string;
    order_number: number;
    is_primary: boolean;
    created_at?: string; // ISO string from Laravel timestamps
    updated_at?: string;
    
    // Optional: If you eager load the morph relationship
    mediable?: any; 
}

export interface UploadedImage {
  id: string | number
  url: string
  file: File | null
  isPrimary: boolean
  isExistingMedia: boolean
}