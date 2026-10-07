<?php

namespace App\Http\Controllers\Admin\Inbox;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
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

        $adminAuth = auth('web')->user();
        $clients = Client::where('is_registered', true)->get();
        $admins = User::where('id', '!=' , $adminAuth->id)->get();

        return Inertia::render('admin/inbox/Inbox', compact('filters', 'admins', 'clients'));
    }
}
