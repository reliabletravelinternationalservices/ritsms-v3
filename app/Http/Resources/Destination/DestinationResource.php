<?php

namespace App\Http\Resources\Destination;

use App\Http\Resources\Image\ImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'slug'            => $this->slug,
            'country'         => $this->country,
            'tag'              => $this->tag,
            'locations_count' => $this->locations_count,

            'image' => ImageResource::make($this->whenLoaded('image')),
        ];
    }
}