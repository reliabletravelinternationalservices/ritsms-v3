<?php

namespace App\Services\Client;

use App\Enums\Image\Collection;
use App\Models\Client;
use App\Models\Tour;
use App\Services\MediaService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ClientService
{

    /*
    |--------------------------------------------------------------------------------------
    | CREATE TOUR OVERVIEW
    |--------------------------------------------------------------------------------------
    */
    public function create(array $data)
    {
        return Client::create($data);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE TOUR
    |--------------------------------------------------------------------------------------
    */
    public function update(Client $client, array $data)
    {
        return $client->update($data);
    }

    
    /*
    |------------------------------------------------------------------------------------------
    | GET TOURS
    |------------------------------------------------------------------------------------------
    */

    public function getClients(
        array $relationships = [],
        array $filters = []
    ) {
        $perPage = $filters['per_page'] ?? 10;

        return Client::with($relationships)
            ->when(
                isset($filters['status']) && $filters['status'] !== 'all',
                function ($query) use ($filters) {

                    if ($filters['status'] === 'deleted') {
                        $query->onlyTrashed();
                    } else {
                        $query->where('status', $filters['status']);
                    }

                }
            )
            ->when(
                isset($filters['search']) && $filters['search'] !== '',
                function ($query) use ($filters) {
                    $search = $filters['search'];

                    $query->where(function ($query) use ($search) {
                        $query
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('code', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                isset($filters['type']) && $filters['type'] !== 'all',
                fn ($query) => $query->where('type', $filters['type'])
            )
            ->when(
                isset($filters['source']) && $filters['source'] !== 'all',
                fn ($query) => $query->where('source', $filters['source'])
            )
            ->paginate($perPage)
            ->withQueryString();
    }


    public function getClientBySlug(string $slug, array $relationships)
    {
        return Client::with($relationships)
            ->where('slug', $slug)
            ->whereNull('deleted_at')
            ->firstOrFail();
    }



    /*
    |------------------------------------------------------------------------------------------
    | GET TOUR STATS
    |------------------------------------------------------------------------------------------
    */

    public function getClientTotalCount()
    {
        return Client::count();
    }
}
