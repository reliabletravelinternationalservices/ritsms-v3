<?php
namespace App\Repository\Destination;

use App\Models\Destination;
use Illuminate\Support\Facades\DB;

class DestinationRepository
{
    public function createDestination(array $destination)
    {
        return DB::transaction(function () use ($destination) {
            return Destination::create($destination);
        });
    }


    public function createManyDestination(array $destinations)
    {
        return collect($destinations)->map(fn (array $item) => $this->createDestination($item));
    }


    public function getDestinationByID(int $id)
    {
        // This executes 1 query for destination + 2 queries for relations
        return Destination::with(['locations', 'image'])->findOrFail($id);
    }

    public function getAllDestinations()
    {
        return Destination::with(['locations', 'locations.image', 'image'])->get();
    }
}