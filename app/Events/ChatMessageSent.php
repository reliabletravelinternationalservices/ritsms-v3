<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $uuid,
        public ChatMessage $chatMessage
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel(
                'chat.session.' . $this->uuid
            ),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->chatMessage->id,
            'message' => $this->chatMessage->message,
            'sender_type' => $this->chatMessage->sender_type,
            'created_at' => $this->chatMessage->created_at,
        ];
    }
}