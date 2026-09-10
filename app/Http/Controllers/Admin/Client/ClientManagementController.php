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
        $filters = $request->only([
                'page',
                'per_page',
                'type',
                'source',
                'status',
                'search',
            ]);

        $clients = $this->service->getClients([], $filters);
            
        $stats = $this->stats();
    
        return Inertia::render('admin/client/ClientManagement', compact('clients', 'stats', 'filters'));
    }

    private function stats(): array
    {
        return [
            'totalClient' => $this->service->getClientTotalCount()
        ];
    }
}