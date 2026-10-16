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

        $userType = get_class($user);
        $userId = $user->id;

        $data = ChatConversation::query()
            ->with([
                'createdBy',
                'latestMessage.sender',
                'latestMessage.reads',
            ])
            ->cursorPaginate(15);

        return response()->json($data);
    }
}
