<?php

namespace App\Http\Resources\Convo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'type' => $this->type,
            'sent_at' => $this->sent_at,
            'sender' => UserResource::make(
                $this->whenLoaded('sender'),
            ),
            'client_id' => $this->client_id,
            'is_read' => $this->isRead(),
        ];
    }
}
