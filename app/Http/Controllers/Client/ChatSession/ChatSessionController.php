<?php

namespace App\Http\Controllers\Client\ChatSession;

use App\Http\Controllers\Controller;
use App\Models\ChatSession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class ChatSessionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $session = ChatSession::create();

        return response()->json([
            'uuid' => $session->uuid,
            'code' => $session->code,
            'token' => $session->token,
            'status' => $session->status,
        ], 201);
    }

    public function show(ChatSession $chatSession): JsonResponse
    {
        return response()->json([
            'uuid' => $chatSession->uuid,
            'status' => $chatSession->status,
            'code' => $chatSession->code,
        ]);
    }
}