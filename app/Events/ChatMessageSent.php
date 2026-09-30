<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public ChatMessage $chatMessage
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel(
                'chat.session.' . $this->chatMessage->chat_session_id
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
            'sender' => $this->chatMessage->sender_type,
            'created_at' => $this->chatMessage->created_at,
        ];
    }
}