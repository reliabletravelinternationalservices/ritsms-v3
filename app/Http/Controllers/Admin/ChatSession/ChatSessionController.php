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
            ->with(['latestMessage',  'newMessagesCount'])
            ->get();

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
            'messages' => $messages,
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
        ]);

        $session->update([
            'last_message_at' => now(),
        ]);

        broadcast(new ChatMessageSent($uuid, $chatMessage));

        return response()->json([
            'id' => $chatMessage->id,
            'sender' => 'me',
            'content' => $chatMessage->message,
            'time' => $chatMessage->created_at->format('g:i A'),
        ], 201);
    }

    private function getInitials(string $name): string
    {
        return collect(explode(' ', $name))
            ->filter()
            ->map(fn ($word) => strtoupper($word[0]))
            ->take(2)
            ->implode('');
    }
}