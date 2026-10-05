<?php

namespace App\Http\Controllers\Client\Conversation;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreateConversationController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $client = auth('client')->user();

        if (! $client) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $conversation = DB::transaction(function () use ($validatedData, $client) {
            $conversation = Conversation::create([
                'name' => $client->name,
                'last_message_at' => now(),
                'is_turned_over' => false,
            ]);

            $conversation->participants()->create([
                'participant_type' => get_class($client),
                'participant_id' => $client->id,
            ]);

            $conversation->messages()->create([
                'sender_type' => get_class($client),
                'sender_id' => $client->id,
                'state' => 'unread',
                'message' => $validatedData['message'],
            ]);

            return $conversation;
        });

        $conversation->load([
            'messages.sender',
            'lastMessage',
        ]);

        return response()->json([
            'message' => 'Chat request created successfully.',
            'data' => $conversation,
        ], 201);
    }
}
