<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\ChatSession;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel(
    'chat.session.{sessionId}',
    function ($user, $sessionId) {
        return ChatSession::where(
            'id',
            $sessionId
        )->exists();
    }
);