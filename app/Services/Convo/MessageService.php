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
        ?string $clientID = null
    ): ConversationMessage {
        return DB::transaction(function () use ($convo, $message, $senderID, $clientID) {
            $sender = User::findOrFail($senderID);
            $now = now();

            $message = $convo->messages()->create([
                'type' => Type::TEXT,
                'body' => $message,
                'sender_id' => $sender->id,
                'sender_type' => $sender->getMorphClass(),
                'sent_at' => $now,
                'client_id' => $clientID,
            ]);

            $convo->participants()
                ->where('participant_id', $sender->id)
                ->where('participant_type', $sender->getMorphClass())
                ->update([
                    'last_read_at' => $now,
                ]);

            $convo->touch();

            return $message;
        });
    }
}
