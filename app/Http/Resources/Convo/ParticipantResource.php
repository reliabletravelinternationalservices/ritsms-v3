<?php

namespace App\Http\Resources\Convo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'role' => $this->role,
            'joined_at' => $this->joined_at,
            'left_at' => $this->left_at,
            'last_read_at' => $this->last_read_at,

            'participant' => UserResource::make(
                $this->whenLoaded('participant')
            ),

            'total_unread' => $this->resource->relationLoaded('conversation')
                ? $this->getUnreadMessagesCount()
                : 0,
        ];
    }
}
