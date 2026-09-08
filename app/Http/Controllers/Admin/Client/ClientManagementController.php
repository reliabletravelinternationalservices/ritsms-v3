<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Inertia\Inertia;
use Inertia\Response;

class ClientManagementController extends Controller
{
    public function index(): Response
    {
        $clients = Client::latest()->paginate(10);
        $stats = $this->stats();

        return Inertia::render('admin/client/ClientManagement', compact('clients', 'stats'));
    }

    private function stats(): array
    {
        return [
            'totalClient' => Client::count()
        ];
    }
}