<?php

namespace App\Http\Middleware;

use App\Models\ChatSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ChatSessionAuth
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        $token = $request->header('X-Chat-Token');

        if (!$token) {
            return response()->json([
                'message' => 'Chat session token is required.',
            ], 401);
        }

        $chatSession = $request->route('chatSession');

        // Route binding may give us the model,
        // otherwise resolve it from the UUID.
        if (!$chatSession instanceof ChatSession) {
            $chatSession = ChatSession::where(
                'uuid',
                $chatSession
            )->first();
        }

        if (!$chatSession) {
            return response()->json([
                'message' => 'Chat session not found.',
            ], 404);
        }

        if (!hash_equals($chatSession->token, $token)) {
            return response()->json([
                'message' => 'Invalid chat session.',
            ], 401);
        }

        if ($chatSession->status !== 'open') {
            return response()->json([
                'message' => 'This chat session is closed.',
            ], 403);
        }

        $request->attributes->set(
            'chat_session',
            $chatSession
        );

        return $next($request);
    }
}