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
        $totalUnreadConvoChat = ChatConversation::whereHas(
            'messages.reads',
            fn($query) => $query->whereNull('read_at')
        )->count();

        return response()->json([
            'totalUnreadSessionChat' => $totalUnreadSessionChat,
            'totalUnreadConvoChat' => $totalUnreadConvoChat
        ]);
    }
}
