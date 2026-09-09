<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Client\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateClientController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('admin/client/CreateClient');
    }


    public function store(ClientRequest $request)
    {
        $validatedData = $request->validated();

        Client::create($validatedData);
        return to_route('admin.clients');
    }
}
