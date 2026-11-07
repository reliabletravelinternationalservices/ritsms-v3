<?php

namespace App\Services\Convo;

use App\Enums\ConvoMessage\Type;
use App\Models\Conversation;
use App\Models\ConversationMessage;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MessageService
{

    public function createSystemMessage(
        Conversation $convo,
        string $message,
    ): ConversationMessage {

        return DB::transaction(function () use ($convo, $message) {
            $message = $convo->messages()->create([
                'type' => Type::SYSTEM,
                'body' => $message,
            ]);

            return $message;
        });
    }


    public function createTextMessage(
        Conversation $convo,
        string $message,
        int $senderID,
    ): ConversationMessage {
        return DB::transaction(function () use ($convo, $message, $senderID) {
            $sender = User::findOrFail($senderID);

            $message = $convo->messages()->create([
                'type' => Type::TEXT,
                'body' => $message,
                'sender_id' => $sender->id,
                'sender_type' => get_class($sender),
                'sent_at' => now(),
            ]);

            return $message;
        });
    }
}
