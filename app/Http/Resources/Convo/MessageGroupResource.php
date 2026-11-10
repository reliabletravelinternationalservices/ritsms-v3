<?php

namespace App\Http\Resources\Convo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageGroupResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource['id'],

            'sender' => UserResource::make(
                $this->resource['sender']
            ),

            'sent_at' => $this->resource['sent_at'],

            'messages' => MessageResource::collection(
                $this->resource['messages']
            ),
        ];
    }
}
