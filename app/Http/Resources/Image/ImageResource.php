<?php

namespace App\Http\Resources\Image;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->image->id,
            'file_path' => $this->image->file_path,
            'file_name' => $this->image->file_name,
            'alt_text'  => $this->image->alt_text,
        ];
    }
}
