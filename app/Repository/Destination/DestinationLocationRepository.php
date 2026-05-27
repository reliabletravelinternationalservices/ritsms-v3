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
        return collect($destinations)->map(fn(array $item) => $this->createDestinationLocation($item));
    }


    public function createLocation(array $data, int $destID)
    {
        $data['destination_id'] = $destID;
        return $this->createDestinationLocation($data);
    }



    public function createLocationImage(DestinationLocation $location, object $image)
    {

        $folderPath = "upload/location/{$location->id}";
        $path = $image->store($folderPath, 'public');
        return DB::transaction(function () use ($location, $image, $path) {
            return $location->image()->create([
                'file_name' => $image->getClientOriginalName(),
                'file_path' => $path,
                'url' => url('storage/' . $path),
                'disk' => 'public',
                'mime_type' => $image->getMimeType(),
                'size' => $image->getSize(),
                'alt_text' => $location->name,
                'order_number' => 1,
                'is_primary' => true,
            ]);
        });
    }
}
