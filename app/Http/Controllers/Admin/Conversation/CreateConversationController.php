<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\ConvoCreated;

class CreateConversationController extends Controller
{

    public function store(Request $request)
    {
        // Validate the request data
    }
}
