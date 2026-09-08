<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateClientController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('admin/client/CreateClient');
    }
}
