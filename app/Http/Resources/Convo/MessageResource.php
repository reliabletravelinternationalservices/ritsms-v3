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
            'client_id' => $this->client_id,

            'body' => $this->deleted_at ? null : $this->body,
            'type' => $this->type,

            'sent_at' => $this->sent_at,

            'sender' => UserResource::make(
                $this->whenLoaded('sender')
            ),

            'reply_to' => ReplyMessageResource::make(
                $this->whenLoaded('replyTo')
            ),

            'is_edited' => $this->is_edited,
            'is_read' => $this->isRead(),
            'deleted_at' => $this->deleted_at,
        ];
    }
}
