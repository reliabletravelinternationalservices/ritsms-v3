<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\MessageResource;
use App\Models\Conversation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use AuthorizesRequests;

    public function getMessages(Request $request, Conversation $convo)
    {

        $this->authorize("view", $convo);

        $messages = $convo->messages()
            ->with([
                "sender",
                "replyTo.sender",
            ])
            ->orderByDesc("id")
            ->cursorPaginate(
                30,
                ["*"],
                "cursor",
                $request->input("cursor")
            )
            ->withQueryString();

        return MessageResource::collection($messages);
    }
}
