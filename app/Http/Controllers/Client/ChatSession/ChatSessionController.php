<?php

namespace App\Http\Controllers\Client\ChatSession;

use App\Events\ChatMessageSent;
use App\Http\Controllers\Controller;
use App\Models\ChatSession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ChatSessionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $session = ChatSession::create();

        $message = $session->messages()->create([
            'sender_type' => 'admin',
            'message' => 'Thank you for massaging us. How can we help you?',
            'state' => 'unread',
        ]);

        $session->update([
            'last_message_at' => now(),
        ]);

        broadcast(new ChatMessageSent($session->uuid, $message));

        return response()->json([
            'id' => $session->id,
            'uuid' => $session->uuid,
            'code' => $session->code,
            'token' => $session->token,
            'status' => $session->status,
        ], 201);
    }

    public function show(ChatSession $chatSession): JsonResponse
    {
        return response()->json([
            'id' => $chatSession->id,
            'uuid' => $chatSession->uuid,
            'status' => $chatSession->status,
            'code' => $chatSession->code,
        ]);
    }

    public function validateSession(ChatSession $chatSession): JsonResponse
    {
        return response()->json([
            'is_valid' => true,
            'message' => 'Chat Credentia is valid..'
        ], 200);
    }
}