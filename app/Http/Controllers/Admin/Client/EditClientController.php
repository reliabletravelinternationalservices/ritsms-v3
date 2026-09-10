<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Client\ClientRequest;
use App\Models\Client;
use App\Services\Client\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditClientController extends Controller
{
    public function __construct(protected ClientService $service) {
    }

    public function edit(string $slug)
    {
        $client = $this->service->getClientBySlug($slug, []);
        return Inertia::render('admin/client/EditClient', compact('client'));
    }

    public function update(ClientRequest $request, Client $client)
    {
        $validated = $request->validated();
        $this->service->update($client, $validated);
        return to_route('admin.clients.edit', [ 'slug' => $client->slug ]);
    } 
}
