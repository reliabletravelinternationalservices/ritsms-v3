<?php

namespace App\Http\Controllers\Admin\Inbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InboxController extends Controller
{
    public function index(Request $request): Response
    {
            $filters = $request->only([
                'type',
            ]);


        return Inertia::render('admin/inbox/Inbox', compact('filters'));
    }
}
