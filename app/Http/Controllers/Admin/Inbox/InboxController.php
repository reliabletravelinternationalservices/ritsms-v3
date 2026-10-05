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

        $filters = [
            'type' => $request->input('type'),
        ];

        return Inertia::render('admin/inbox/Inbox', compact('filters'));
    }
}
