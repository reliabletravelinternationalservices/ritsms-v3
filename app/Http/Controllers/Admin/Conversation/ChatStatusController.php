<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use App\Models\ChatSession;
use Illuminate\Http\Request;

class ChatStatusController extends Controller
{

    public function index()
    {

        $totalUnreadSessionChat = ChatSession::has('newMessagesCount')
            ->count();



        $user = auth('web')->user();

        $userType = get_class($user);
        $userId = $user->id;


        $totalUnreadSessionChat = ChatSession::has('newMessagesCount')
            ->count();

        $totalUnreadConvoChat = ChatConversation::whereHas(
            'messages',
            function ($query) use ($userType, $userId) {
                $query
                    // The user has not read this message.
                    ->whereDoesntHave('reads', function ($query) use ($userType, $userId) {
                        $query->where('reader_type', $userType)
                            ->where('reader_id', $userId)
                            ->whereNotNull('read_at');
                    });
            }
        )->count();


        return response()->json([
            'totalUnreadSessionChat' => $totalUnreadSessionChat,
            'totalUnreadConvoChat' => $totalUnreadConvoChat
        ]);
    }
}
