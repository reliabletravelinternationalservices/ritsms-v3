<?php
namespace App\Repository\Destination;

use App\Models\Destination;
use App\Models\Media;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        return Destination::with(['locations', 'image', 'locations.image'])->findOrFail($id);
    }

    public function getAllDestinations()
    {
        return Destination::with(['locations', 'locations.image', 'image'])->get();
    }



    public function storeDestinationImage(array $data, int $id)
    {
        $destination = Destination::findOrFail($id);

        $file = $data['image'];

        $folderPath = "upload/destination/{$id}";
        $path = $file->store($folderPath, 'public');

        return DB::transaction(function () use ($destination, $path, $file, $id) {
            return Media::create([
                'mediable_id' => $id,
                'mediable_type' => $destination->getMorphClass(),
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'alt_text' => $file->getClientOriginalName(),
                'url' => Storage::url($path),
                'disk' => 'local',
                'type' => 'image',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'order_number' => 1,
                'is_primary' => false,
            ]);
        });
    }
}