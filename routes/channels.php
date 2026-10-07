<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\ChatSession;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\User; 



Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel(
    'participant.user.{id}',
    function (User $user, int $id) {
        return $user->id === $id;
    },
    ['guards' => ['web']]
);

Broadcast::channel(
    'participant.client.{id}',
    function (Client $client, int $id) {
        return $client->id === $id;
    },
    ['guards' => ['client']]
);