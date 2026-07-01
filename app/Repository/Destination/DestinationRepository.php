<?php

namespace App\Repository\Destination;

use App\Models\Destination;
use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
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

    public function updateDestination(int $id, array $data)
    {
        $destination = Destination::findOrFail($id);

        return DB::transaction(function () use ($destination, $data) {
            $destination->update($data);
            return $destination->fresh(['locations', 'locations.image', 'image']);
        });
    }

    public function deleteDestination(int $id)
    {
        $destination = Destination::findOrFail($id);

        return DB::transaction(function () use ($destination) {
            $this->deleteDestinationImage($destination->id);
            return $destination->delete();
        });
    }

    public function createManyDestination(array $destinations)
    {
        return collect($destinations)->map(fn(array $item) => $this->createDestination($item));
    }


    public function getDestinationByID(int $id)
    {
        // This executes 1 query for destination + 2 queries for relations
        return Destination::with(['locations', 'image', 'locations.image'])->findOrFail($id);
    }

    public function getAllDestinations()
    {
        return Destination::with(['locations', 'locations.image', 'image'])->orderBy('updated_at', 'desc')->get();
    }



    public function getDestinationDistinctByCountry()
    {
        return Destination::with(['locations', 'locations.image', 'image'])
        ->orderBy('updated_at', 'desc')
        ->get()
        ->unique('country')
        ->values();
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
                'disk' => 'public',
                'type' => 'image',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'order_number' => 1,
                'is_primary' => false,
            ]);
        });
    }


    public function updateDestinationImage(array $data, int $id)
    {
        $destination = Destination::findOrFail($id);
        $file = $data['image'];

        return DB::transaction(function () use ($destination, $file, $id) {
            $media = Media::where('mediable_id', $id)
                ->where('mediable_type', Destination::class)
                ->first();

            if ($media) {
                Storage::disk($media->disk ?: 'public')->delete($media->file_path);
            }

            $folderPath = "upload/destination/{$id}";
            $path = $file->store($folderPath, 'public');

            if ($media) {
                return $media->update([
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'alt_text' => $file->getClientOriginalName(),
                    'url' => Storage::url($path),
                    'disk' => 'public',
                    'type' => 'image',
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ]);
            }

            return Media::create([
                'mediable_id' => $id,
                'mediable_type' => $destination->getMorphClass(),
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'alt_text' => $file->getClientOriginalName(),
                'url' => Storage::url($path),
                'disk' => 'public',
                'type' => 'image',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'order_number' => 1,
                'is_primary' => false,
            ]);
        });
    }

    public function deleteDestinationImage(int $id)
    {
        return DB::transaction(function () use ($id) {
            $media = Media::where('mediable_id', $id)
                ->where('mediable_type', Destination::class)
                ->first();

            if ($media) {
                Storage::disk($media->disk)->delete($media->file_path);
                return $media->delete();
            }

            return false;
        });
    }



    public function getDestinationStatistics()
    {
        $totalDestinations = Destination::count();
        $totalLocations = DB::table('destination_locations')->count();
        $totalListedCountries = DB::table('destinations')->distinct('country')->count();

        return [
            'total_destinations' => $totalDestinations,
            'total_locations' => $totalLocations,
            'total_listed_countries' => $totalListedCountries,
        ];
    }
}

