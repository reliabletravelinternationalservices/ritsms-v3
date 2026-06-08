<?php

namespace App\Repository\Destination;

use App\Models\DestinationLocation;
use App\Models\Media;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function deleteLocation(int $locationID)
    {
        return DB::transaction(function () use ($locationID) {
            $location = DestinationLocation::findOrFail($locationID);
            return $location->delete();
        });
    }

    public function createLocation(array $data, int $destID)
    {
        $data['destination_id'] = $destID;
        return $this->createDestinationLocation($data);
    }

    public function updateLocation(int $locationID, array $data)
    {
        return DB::transaction(function () use ($locationID, $data) {
            $location = DestinationLocation::findOrFail($locationID);
            return $location->update($data);
        });
    }

    public function getLocationByID(int $locationID)
    {
        return DestinationLocation::with(['image', 'destination'])->findOrFail($locationID);
    }

    public function getDistinctLocationNames(): array
    {
        return DestinationLocation::query()
            ->select('name')
            ->distinct()
            ->orderBy('name')
            ->pluck('name')
            ->toArray();
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

    public function updateLocationImage(int $locationID, object $image)
    {
        $location = DestinationLocation::findOrFail($locationID);
        $file = $image;

        return DB::transaction(function () use ($location, $file) {
            $media = $location->image;

            if ($media) {
                Storage::disk($media->disk ?: 'public')->delete($media->file_path);
            }

            $folderPath = "upload/location/{$location->id}";
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
                'mediable_id' => $location->id,
                'mediable_type' => $location->getMorphClass(),
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

    public function deleteLocationImage(int $id)
    {
        return DB::transaction(function () use ($id) {
            $media = Media::where('mediable_id', $id)
                ->where('mediable_type', DestinationLocation::class)
                ->first();

            if ($media) {
                Storage::disk($media->disk)->delete($media->file_path);
                return $media->delete();
            }

            return false;
        });
    }
}
