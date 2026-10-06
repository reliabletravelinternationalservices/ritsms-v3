<?php

namespace App\Http\Controllers\Admin\Inbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InboxController extends Controller
{
    public function index(Request $request): Response | RedirectResponse
    {

    
        if (!$request->filled('type')) {
            return redirect()->route('admin.inbox', [
                'type' => 'chats',
            ]);
        }

        // $totalSessions = ChatSession::where(function ($query) {
        //     // No admin reply yet
        //     $query->whereDoesntHave('messages', function ($q) {
        //         $q->where('sender_type', 'admin');
        //     })

        //     // OR has unread messages from client/guest
        //     ->orWhereHas('messages', function ($q) {
        //         $q->where('state', 'unread')
        //         ->where('sender_type', 'client');
        //     });
        // })->count();

        // $admin = auth('web')->user();

        // $totalConvos = Conversation::query()
        //     ->whereHas('participants', function ($query) use ($admin) {
        //         $query
        //             ->where('participant_type', User::class)
        //             ->where('participant_id', $admin->id)
        //             ->where(function ($query) {
        //                 $query->whereNull('last_read_at')
        //                     ->orWhereColumn(
        //                         'conversations.last_message_at',
        //                         '>',
        //                         'conversation_participants.last_read_at'
        //                     );
        //             });
        //     })
        //     ->count();

        $filters = [
            'type' => $request->input('type'),
        ];

        return Inertia::render('admin/inbox/Inbox', compact('filters'));
    }
}
