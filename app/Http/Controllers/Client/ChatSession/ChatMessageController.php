<?php

namespace App\Http\Controllers\Client\ChatSession;

use App\Events\ChatMessageSent;
use App\Http\Controllers\Controller;
use App\Models\ChatSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    public function getMessages(Request $request): JsonResponse
    {
        /** @var ChatSession $chatSession */
        $chatSession = $request->attributes->get('chat_session');

        $messages = $chatSession->messages()
            ->orderBy('created_at')
            ->get([
                'id',
                'message',
                'sender_type',
                'state',
                'created_at',
            ])
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'message' => $message->message,
                    'created_at' => $message->created_at,
                    'sender_type' => $message->sender_type,
                    'state' => $message->state,
                ];
            });

        return response()->json($messages);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'sender_type' => [
                'required',
                'string',
                'in:session,admin',
            ],
            'message' => [
                'required',
                'string',
                'max:5000',
            ],
        ]);

        /** @var ChatSession $chatSession */
        $chatSession = $request->attributes->get('chat_session');

        $chatMessage = $chatSession->messages()->create([
            'sender_type' => $validated['sender_type'],
            'message' => $validated['message'],
            'state' => 'unread',
        ]);

        $chatSession->update([
            'last_message_at' => now(),
        ]);

        broadcast(new ChatMessageSent($chatSession->uuid, $chatMessage));

        return response()->json([
            'id' => $chatMessage->id,
            'type' => $chatMessage->type,
            'message' => $chatMessage->message,
            'created_at' => $chatMessage->created_at,
            'sender_type' => $chatMessage->sender_type,
            'state' => $chatMessage->state,
        ], 201);
    }

    public function markAsRead(Request $request): JsonResponse
    {
        /** @var ChatSession $chatSession */
        $chatSession = $request->attributes->get('chat_session');

        $unreadMessageIds = $chatSession->messages()
            ->where('sender_type', 'admin')
            ->where('state', 'unread')
            ->pluck('id');

        if ($unreadMessageIds->isNotEmpty()) {
            $chatSession->messages()
                ->whereIn('id', $unreadMessageIds)
                ->update(['state' => 'read']);
        }

        return response()->json([
            'read_message_ids' => $unreadMessageIds,
        ]);
    }
}
