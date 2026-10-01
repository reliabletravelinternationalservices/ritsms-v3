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
            ->with('latestMessage')
            ->get();

        return response()->json($sessions);
    }

    public function show(string $uuid): JsonResponse
    {
        $session = ChatSession::where('uuid', $uuid)
            ->firstOrFail();

        $messages = $session->messages()
            ->orderBy('created_at')
            ->get([
                'id',
                'message',
                'sender_type',
                'created_at',
            ])
            ->map(fn ($message) => [
                'id' => $message->id,
                'sender' => $message->sender_type === 'admin'
                    ? 'me'
                    : 'them',
                'content' => $message->message,
                'time' => $message->created_at->format('g:i A'),
            ]);

        return response()->json([
            'session' => [
                'uuid' => $session->uuid,
                'name' => $session->guest_name ?? 'Website Visitor',
                'initials' => $this->getInitials(
                    $session->guest_name ?? 'Website Visitor'
                ),
                'status' => $session->status === 'open'
                    ? 'online'
                    : 'offline',
            ],
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