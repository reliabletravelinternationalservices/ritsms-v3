<?php

namespace App\Http\Resources\Convo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReplyMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'body' => $this->deleted_at ? null : $this->body,
            'type' => $this->type,

            'sender' => UserResource::make(
                $this->whenLoaded('sender')
            ),

            'sent_at' => $this->sent_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
