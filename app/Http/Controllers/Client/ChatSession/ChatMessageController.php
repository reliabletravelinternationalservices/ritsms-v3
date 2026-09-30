<?php

namespace App\Http\Controllers\Client\ChatSession;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Events\ChatMessageSent;

class ChatMessageController extends Controller
{
    
    public function index(Request $request): JsonResponse
    {
        /** @var ChatSession $chatSession */
        $chatSession = $request->attributes->get('chat_session');

        $messages = $chatSession->messages()
            ->orderBy('created_at')
            ->get([
                'id',
                'message',
                'sender_type',
                'created_at',
            ])
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'message' => $message->message,
                    'created_at' => $message->created_at,
                    'sender' => $message->sender_type,
                ];
            });

        return response()->json($messages);
    }


    public function store(Request $request): JsonResponse
    {
        /** @var ChatSession $chatSession */
        $chatSession = $request->attributes->get('chat_session');

        $validated = $request->validate([
            'message' => [
                'required',
                'string',
                'max:5000',
            ],
        ]);

        $chatMessage = $chatSession->messages()->create([
            'sender_type' => 'user',
            'message' => $validated['message'],
        ]);

        $chatSession->update([
            'last_message_at' => now(),
        ]);

        broadcast(new ChatMessageSent($chatMessage));

        return response()->json([
            'id' => $chatMessage->id,
            'message' => $chatMessage->message,
            'created_at' => $chatMessage->created_at,
            'sender' => 'user',
        ], 201);
    }
    
}