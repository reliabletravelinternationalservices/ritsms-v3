<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use Illuminate\Http\Request;

class ConvoMessagesController extends Controller
{
    public function messages(int $id)
    {
        $chat = ChatConversation::findOrFail($id);

        $data = $chat->messages()
            ->orderBy('created_at', 'asc')
            ->orderBy('id', 'asc')
            ->cursorPaginate(30);

        return response()->json($data);
    }

    public function read(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        $chat = ChatConversation::findOrFail($validated['id']);

        $user = auth('web')->user();

        $messages = $chat->messages();

        foreach ($messages->get() as $message) {

            $message->reads()->firstOrCreate([
                'reader_type' => $user->role,
                'reader_id' => $user->id,
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }
}
