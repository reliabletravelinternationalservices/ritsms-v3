<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatContactController extends Controller
{


    public function index(Request $request)
    {
        $search = $request->input('search');

        $clients = Client::query()
            ->select([
                'code',
                'name',
                'email',
                DB::raw("'client' as contact_type"),
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            });

        $agents = User::query()
            ->select([
                'code',
                'name',
                'email',
                DB::raw("'agent' as contact_type"),
            ])
            ->where('role', 'agent')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            });
        
        $contacts = $clients
            ->unionAll($agents)
            ->orderBy('name')
            ->orderBy('email')
            ->cursorPaginate(20)
            ->withQueryString();

        return response()->json($contacts);
    }
}
