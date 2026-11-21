<?php

namespace App\Support\Conversations;

use App\Models\Conversation;

class GroupNameGenerator
{
    public function generate(Conversation $conversation): string
    {
        $names = $conversation->participants
            ->pluck('participant.display_name')
            ->filter()
            ->map(fn ($name) => explode(' ', trim($name))[0])
            ->values();

        $displayNames = $names->take(3)->implode(', ');

        if ($names->count() > 3) {
            $displayNames .= ' and ' . ($names->count() - 3) . ' others';
        }

        return $displayNames;
    }
}
