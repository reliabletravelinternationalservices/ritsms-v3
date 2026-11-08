<?php

namespace App\Observers;

use App\Enums\Convo\Type;
use App\Models\Conversation;
use App\Models\User;
use App\Services\Convo\MessageService;

class ConversationObserver
{
    /**
     * Handle the Conversation "created" event.
     */
    public function created(Conversation $conversation): void
    {
        app(MessageService::class)->createSystemMessage(
            $conversation,
            'Started a new conversation'
        );
    }

    /**
     * Handle the Conversation "updated" event.
     */
    public function updated(Conversation $conversation): void
    {
        //
    }

    /**
     * Handle the Conversation "deleted" event.
     */
    public function deleted(Conversation $conversation): void
    {
        //
    }

    /**
     * Handle the Conversation "restored" event.
     */
    public function restored(Conversation $conversation): void
    {
        //
    }

    /**
     * Handle the Conversation "force deleted" event.
     */
    public function forceDeleted(Conversation $conversation): void
    {
        //
    }
}
