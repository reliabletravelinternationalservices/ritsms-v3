<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\MessageGroupResource;
use App\Models\Conversation;
use App\Services\Convo\MessageGroupingService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use AuthorizesRequests;

    public function getMessages(
        Request $request,
        Conversation $convo,
        MessageGroupingService $grouping
    ) {
        $this->authorize('view', $convo);

        $messages = $convo->messages()
            ->withTrashed()
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

        // Convert DESC pagination results to chronological order.
        $collection = $messages
            ->getCollection()
            ->reverse()
            ->values();

        // Group messages without changing cursor pagination.
        $messages->setCollection(
            $grouping->group($collection)
        );

        return MessageGroupResource::collection($messages);
    }
}
