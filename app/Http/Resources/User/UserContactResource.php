<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Convo\ConversationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserContactResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'display_name' => $this->display_name,
            'type' => $this->type,
            'avatar' => $this->avatar,
            'email' => $this->email,
            'role' => $this->role,
            'private_conversation' => $this->whenLoaded(
                'conversations',
                fn () => ConversationResource::make($this->conversations->first())
            ),
        ];
    }
}
