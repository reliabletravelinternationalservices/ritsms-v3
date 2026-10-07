<?php

namespace App\Events;

use App\Models\Conversation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConvoCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Conversation $conversation
    ) {
    }

    public function broadcastAs(): string
    {
        return 'convo.created';
    }

    public function broadcastOn(): array
    {
        $this->conversation->loadMissing('participants');

        return $this->conversation
            ->participants
            ->map(function ($participant) {
                return new PrivateChannel(
                    'participant.'
                    . $participant->participant_type
                    . '.'
                    . $participant->participant_id
                );
            })
            ->unique(fn ($channel) => $channel->name)
            ->values()
            ->all();
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->conversation->id,
            'name' => $this->conversation->name,
            'created_at' => $this->conversation->created_at,
        ];
    }
}