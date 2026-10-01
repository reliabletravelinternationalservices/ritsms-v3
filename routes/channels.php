<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\ChatSession;
use Illuminate\Http\Request;


Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

