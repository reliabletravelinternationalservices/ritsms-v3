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
            ->reorder()
            ->with([
                'sender',
                'replyTo.sender',
            ])
            ->orderByRaw('COALESCE(sent_at, created_at) DESC')
            ->orderByDesc('id')
            ->cursorPaginate(
                $request->input('per_page', 30),
                ['*'],
                'cursor',
                $request->input('cursor')
            );

        $messages->setCollection(
            $messages->getCollection()->reverse()->values()
        );

        return MessageResource::collection($messages);

    }
}
