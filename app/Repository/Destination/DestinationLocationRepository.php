<?php
namespace App\Repository\Destination;

use App\Models\DestinationLocation;
use Illuminate\Support\Facades\DB;

class DestinationLocationRepository
{
    public function createDestinationLocation(array $destination)
    {
        return DB::transaction(function () use ($destination) {
            return DestinationLocation::create($destination);
        });
    }


    public function createManyDestinationLocation(array $destinations)
    {
        return collect($destinations)->map(fn (array $item) => $this->createDestinationLocation($item));
    }
}