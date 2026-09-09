<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditClientController extends Controller
{
    public function edit(string $slug)
    {
        $client = Client::where('slug', $slug)->get();
        return Inertia::render('admin/client/EditClient', compact('client'));
    }
}
