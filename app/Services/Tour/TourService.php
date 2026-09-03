<?php

namespace App\Services\Tour;

use App\Enums\Image\Collection;
use App\Models\Tour;
use App\Services\MediaService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TourService
{
    public function __construct(protected MediaService $mediaService) {}

    /*
    |--------------------------------------------------------------------------------------
    | CREATE TOUR OVERVIEW
    |--------------------------------------------------------------------------------------
    */
    public function create(array $data)
    {
        return Tour::create($data);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE TOUR
    |--------------------------------------------------------------------------------------
    */
    public function update(Tour $tour, array $data)
    {
        return $tour->update($data);
    }

    public function updateStatus(Tour $tour, array $data)
    {
        return $tour->update([
            'visibility' => $data['visibility'],
            'state' => $data['state'],
        ]);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE ITINERARIES
    |--------------------------------------------------------------------------------------
    */
    public function updateItineraries(Tour $tour, array $data)
    {
        $tour->itineraries()->forceDelete();

        return $tour->itineraries()->createMany($data);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE ROUTES
    |--------------------------------------------------------------------------------------
    */
    public function updateRoutes(Tour $tour, array $data)
    {
        $tour->routes()->forceDelete();

        return $tour->routes()->createMany($data);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE HOTELS
    |--------------------------------------------------------------------------------------
    */
    public function updateHotels(Tour $tour, array $data)
    {
        $tour->hotels()->forceDelete();

        return $tour->hotels()->createMany($data);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE DEPARTURES
    |--------------------------------------------------------------------------------------
    */
    public function updateDepartures(Tour $tour, array $data)
    {
        $tour->departures()->forceDelete();

        return $tour->departures()->createMany($data);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE MULTIPLE IMAGES
    |--------------------------------------------------------------------------------------
    */
    public function updateMultipleImages(Tour $tour, array $data)
    {
        $directory = $this->mediaService->getTourFolderPath($tour->id, Collection::GALLERY);

        $existingImageCount = $tour->media()->where('type', 'image')->count();
        foreach ($data as $index => $image) {

            $orderNumber = $existingImageCount + ($index + 1);
            $this->createMedia(
                $tour,
                $image,
                'image',
                $orderNumber
            );
        }
    }

    /*
    |--------------------------------------------------------------------------------------
    | CREATE VIDEO
    |--------------------------------------------------------------------------------------
    */
    public function createVideo(Tour $tour, UploadedFile $file, int $orderNumber = 1)
    {
        $this->createMedia(
            $tour,
            $file,
            'video',
            $orderNumber,
            true,
        );
    }

    /*
    |--------------------------------------------------------------------------------------
    | CREATE MEDIA
    |--------------------------------------------------------------------------------------
    */
    public function createMedia(
        Tour $tour,
        UploadedFile $file,
        string $type = 'image' | 'video',
        int $orderNumber = 1,
        bool $includeSize = false,
    ) {

        $collection = '';
        $path = '';

        if ($type == 'image') {
            $collection = Collection::GALLERY;
            $directory = $this->mediaService->getTourFolderPath($tour->id, $collection);

            $path = $this->mediaService->storeImage(
                $file,
                $directory,
            );

        } else {
            $collection = Collection::VIDEO;
            $directory = $this->mediaService->getTourFolderPath($tour->id, $collection);
            $path = $this->mediaService->storeVideo(
                $file,
                $directory,
            );
        }

        $size = $includeSize ? Storage::disk('public')->size($path) : null;
        $tour->media()->create([
            'collection' => $collection,
            'file_name' => basename($path),
            'file_path' => $path,
            'alt_text' => basename($path),
            'disk' => 'public',
            'type' => $type,
            'mime_type' => $file->getMimeType(),
            'size' => $size,
            'order' => $orderNumber,
        ]);
    }

    /*
    |--------------------------------------------------------------------------------------
    | UPDATE MEDIA ORDER
    |--------------------------------------------------------------------------------------
    */
    public function updateMediaOrder(Tour $tour, array $data)
    {
        $orderedMedia = collect($data)
            ->filter(fn ($item) => isset($item['id']))
            ->keyBy('id');

        if ($orderedMedia->isNotEmpty()) {
            $media = $tour->media()->whereIn('id', $orderedMedia->keys()->all())->get()->keyBy('id');

            foreach ($orderedMedia as $id => $order) {
                if (! isset($media[$id])) {
                    continue;
                }

                $media[$id]->update([
                    'order_number' => (int) $order['order_number'],
                ]);
            }
        }
    }

    /*
    |--------------------------------------------------------------------------------------
    | DELETE MEDIA BY ID
    |--------------------------------------------------------------------------------------
    */
    public function deleteMediaById(Tour $tour, array $data)
    {
        $media = $tour->media()->whereIn('id', $data)->get();
        $tour->media()->whereIn('id', $data)->delete();

        foreach ($media as $item) {
            if ($item->type === 'image') {
                $this->mediaService->deleteImage($item->file_path, $item->disk);

                continue;
            }

            if ($item->type === 'video') {
                $this->mediaService->deleteVideo($item->file_path, $item->disk);

                continue;
            }

            $this->mediaService->delete($item->file_path, $item->disk);
        }
    }

    /*
    |------------------------------------------------------------------------------------------
    | GET TOURS
    |------------------------------------------------------------------------------------------
    */

    public function getTours(array $relationships = [])
    {
        return Tour::with($relationships)
            ->whereNull('deleted_at')
            ->where('state', '!=', 'archived')
            ->get();
    }

    public function getTourBySlug(string $slug, array $relationships)
    {
        return Tour::with($relationships)
            ->where('slug', $slug)
            ->whereNull('deleted_at')
            ->firstOrFail();
    }



    /*
    |------------------------------------------------------------------------------------------
    | GET TOUR STATS
    |------------------------------------------------------------------------------------------
    */

    public function getTourTotalCount(bool $activeOnly = false)
    {
        if ($activeOnly) {
            return Tour::where('state', 'published')
                ->where('visibility', 'public')
                ->count();
        }

        return Tour::count();
    }
}
