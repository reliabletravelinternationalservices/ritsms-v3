<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Client\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditClientController extends Controller
{
    public function edit(string $slug)
    {
        $client = Client::where('slug', $slug)->first();
        return Inertia::render('admin/client/EditClient', compact('client'));
    }

    public function update(ClientRequest $request, Client $client)
    {
        $validated = $request->validated();
        $client->update($validated);
        return to_route('admin.clients.edit', [ 'slug' => $client->slug ]);
    } 
}
