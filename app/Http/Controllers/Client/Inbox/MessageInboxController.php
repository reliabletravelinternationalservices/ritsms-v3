<?php

namespace App\Http\Controllers\Client\Inbox;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MessageInboxController extends Controller
{
    public function index()
    {
        return Inertia::render('client/inbox/MessageInbox');
    }
}
