<?php

namespace App\Http\Controllers\Admin\ChatSession;

use App\Events\ChatMessageSent;
use App\Http\Controllers\Controller;
use App\Models\ChatSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatSessionController extends Controller
{
    public function index(): JsonResponse
    {
        $sessions = ChatSession::query()
            ->with(['latestMessage', 'newMessagesCount'])
            ->latest('updated_at')
            ->cursorPaginate(10);

        $sessions->getCollection()->each(function ($session) {
            $session->new_messages_count = $session->newMessagesCount?->count ?? 0;

            unset($session->newMessagesCount);
        });

        return response()->json($sessions);
    }




    public function show(string $uuid): JsonResponse
    {
        $session = ChatSession::where('uuid', $uuid)
            ->firstOrFail();

        $messages = $session->messages()
            ->orderBy('created_at')
            ->get();

        return response()->json([
            ...$messages
        ]);
    }





    public function store(
        Request $request,
        string $uuid
    ): JsonResponse {
        $session = ChatSession::where('uuid', $uuid)
            ->where('status', 'open')
            ->firstOrFail();

        $validated = $request->validate([
            'message' => [
                'required',
                'string',
                'max:5000',
            ],
        ]);

        $chatMessage = $session->messages()->create([
            'sender_type' => 'admin',
            'message' => $validated['message'],
            'state' => 'unread',
        ]);

        $session->update([
            'last_message_at' => now(),
        ]);

        broadcast(new ChatMessageSent($uuid, $chatMessage));

        return response()->json([
            'id' => $chatMessage->id,
            'type' => $chatMessage->type,
            'message' => $chatMessage->message,
            'created_at' => $chatMessage->created_at,
            'sender_type' => $chatMessage->sender_type,
            'state' => $chatMessage->state,
        ], 201);
    }


    public function markAsRead(Request $request, string $uuid): JsonResponse
    {
        $chatSession = ChatSession::where('uuid', $uuid)->firstOrFail();

        $unreadMessageIds = $chatSession->messages()
            ->where('sender_type', 'session')
            ->where('state', 'unread')
            ->pluck('id');

        if ($unreadMessageIds->isNotEmpty()) {
            $chatSession->messages()
                ->whereIn('id', $unreadMessageIds)
                ->update([
                    'state' => 'read',
                ]);
        }

        return response()->json([
            'read_message_ids' => $unreadMessageIds,
        ]);
    }
}
