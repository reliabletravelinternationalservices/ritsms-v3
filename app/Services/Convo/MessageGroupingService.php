<?php

namespace App\Services\Convo;

use Illuminate\Support\Collection;
use App\Models\ConversationMessage;

class MessageGroupingService
{
    public function group(Collection $messages): Collection
    {
        $groups = collect();
        $currentGroup = null;

        foreach ($messages as $message) {
            if (!$this->canAppend($currentGroup, $message)) {
                $currentGroup = [
                    'id' => $message->id,
                    'sender' => $message->sender,
                    'sent_at' => $message->sent_at,
                    'messages' => collect(),
                ];

                $groups->push($currentGroup);
                $currentGroup = $groups->last();
            }

            $currentGroup['messages']->push($message);

            // Keep the latest message for the next comparison.
            $currentGroup['last_message'] = $message;

            $groups->put(
                $groups->count() - 1,
                $currentGroup
            );
        }

        return $groups->map(function ($group) {
            unset($group['last_message']);

            return $group;
        })->values();
    }

    private function canAppend(
        ?array $group,
        ConversationMessage $message
    ): bool {
        if (!$group) {
            return false;
        }

        $previous = $group['last_message'];

        // System messages should always have their own group.
        if (
            $this->getType($message) === 'system' ||
            $this->getType($previous) === 'system'
        ) {
            return false;
        }

        // Pending messages without timestamps stay separate.
        if (!$message->sent_at || !$previous->sent_at) {
            return false;
        }

        // Same sender, including morph type.
        if (
            $message->sender_type !== $previous->sender_type ||
            $message->sender_id !== $previous->sender_id
        ) {
            return false;
        }

        // Same calendar date.
        if (!$message->sent_at->isSameDay($previous->sent_at)) {
            return false;
        }

        // Maximum one-minute difference.
        return $previous->sent_at->diffInSeconds(
            $message->sent_at
        ) <= 60;
    }

    private function getType(ConversationMessage $message): string
    {
        return $message->type instanceof \BackedEnum
            ? $message->type->value
            : (string) $message->type;
    }
}
