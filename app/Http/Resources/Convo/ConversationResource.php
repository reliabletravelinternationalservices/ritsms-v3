<?php

namespace App\Http\Resources\Convo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'avatar' => $this->avatar,
            'created_by' => UserResource::make(
                $this->whenLoaded('createdBy')
            ),
            'latest_message' => MessageResource::make(
                $this->whenLoaded('latestMessage')
            ),
            'participants' => ParticipantResource::collection(
                $this->whenLoaded('participants')
            ),
        ];
    }
}
