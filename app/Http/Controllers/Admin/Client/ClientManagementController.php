<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Services\Client\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientManagementController extends Controller
{
    public function __construct(protected ClientService $service) {
    }
    public function index(Request $request): Response
    {
        $clients = $this->service->getClients([], $request->only([
                'page',
                'per_page',
                'type',
                'source',
                'status',
                'search',
            ]),);
            
        $stats = $this->stats();
    
        return Inertia::render('admin/client/ClientManagement', compact('clients', 'stats'));
    }

    private function stats(): array
    {
        return [
            'totalClient' => $this->service->getClientTotalCount()
        ];
    }
}