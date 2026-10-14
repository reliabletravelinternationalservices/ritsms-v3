<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function conversation(Request $request)
    {
        $user = auth('web')->user();

        $data = ChatConversation::with([
            'latestMessage.sender',
            'latestMessage.reads' => function ($query) use ($user) {
                $query->where('reader_type', get_class($user))
                    ->where('reader_id', $user->id);
            },
        ])->cursorPaginate(15);

        $data->getCollection()->each(function ($conversation) {
            $message = $conversation->latestMessage;

            if ($message) {
                $message->setAttribute(
                    'is_read',
                    $message->reads->contains(
                        fn($read) => $read->read_at !== null
                    )
                );
            }
        });

        return response()->json($data);
    }
}
