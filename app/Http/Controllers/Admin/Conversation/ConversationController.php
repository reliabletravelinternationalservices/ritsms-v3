<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function conversation(Request $request)
    {
        $data = Conversation::with(['lastMessage'])->get();
        dd($data);
    }
}
