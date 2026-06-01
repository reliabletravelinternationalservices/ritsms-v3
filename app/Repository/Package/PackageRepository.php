<?php

namespace App\Repository\Package;

use App\Models\Media;
use App\Models\Package;
use App\Models\PackageGroup;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PackageRepository
{
    public function __construct(protected Package $model) {}

    public function createPackage(array $data): Package
    {
        return DB::transaction(function () use ($data) {
            return $this->model->create($data);
        });
    }

    public function createManyPackage(array $data): Collection
    {
        return collect($data)->map(fn (array $item) => $this->createPackage($item));
    }


    public function updatePackage(int $id, array $data): Package
    {
        return DB::transaction(function () use ($id, $data) {
            $package = $this->model->findOrFail($id);
            $package->update($data);
            return $package;
        });
    }


    public function deletePackage(int $id): bool
    {
        return DB::transaction(function () use ($id) {

            $package = $this->model->findOrFail($id);
            $package->images()->delete();
            Storage::disk('public')->deleteDirectory(
                "upload/package/{$package->id}"
            );
            return $package->delete();
        });
    }

    // GET FEATURED INBOUND PACKAGES: get every package included in groups that display in inbound, distinct to avoid duplication
    public function getFeaturedInboundPackages(): array
    {
        $groups = PackageGroup::where('include_as_inbound', true)
            ->where('is_featured', true)
            ->with('packages.primaryImage')
            ->get();

        $packages = $groups->pluck('packages')->flatten()->unique('id');

        return [
            'packages' => $packages,
        ];
    }

    // GET FEATURED OUTBOUND PACKAGES: get every package included in groups that display in outbound, distinct to avoid duplication
    public function getFeaturedOutboundPackages(): array
    {
        $groups = PackageGroup::where('include_as_outbound', true)
            ->where('is_featured', true)
            ->with('packages.primaryImage')
            ->get();

        $packages = $groups->pluck('packages')->flatten()->unique('id');

        return [
            'packages' => $packages,
        ];
    }

    public function getPackageDetails(int $id): Package
    {
        return $this->model->with('schedules', 'packageGroups', 'primaryImage', 'images')->findOrFail($id);
    }

    public function getPackages(): Collection
    {
        return $this->model->with('primaryImage', 'schedules', 'packageGroups')->OrderBy('created_at', 'desc')->get();
    }

    public function storePackageImage(int $id, array $data)
    {
        $package = Package::findOrFail($id);

        $file = $data['image'];

        $folderPath = "upload/package/{$id}";
        $path = $file->store($folderPath, 'public');

        $nextOrderNumber = Media::where('mediable_type', $package->getMorphClass())
            ->where('mediable_id', $id)
            ->max('order_number') + 1;

        $media = Media::create([
            'mediable_id' => $id,
            'mediable_type' => $package->getMorphClass(),
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'alt_text' => $file->getClientOriginalName(),
            'url' => Storage::url($path), // Clean alternative that resolves IDE method errors
            'disk' => 'local',
            'type' => 'image',
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'order_number' => $nextOrderNumber,
            'is_primary' => false,
        ]);

        return $media;
    }

    public function deletePackageImages(int $id, array $mediaIds): void
    {
        $mediableType = (new Package)->getMorphClass();

        DB::transaction(function () use ($id, $mediaIds, $mediableType) {
            $mediaToDelete = Media::where('mediable_type', $mediableType)
                ->where('mediable_id', $id)
                ->whereIn('id', $mediaIds)
                ->get();

            foreach ($mediaToDelete as $file) {
                if ($file->file_path && Storage::disk('public')->exists($file->file_path)) {
                    Storage::disk('public')->delete($file->file_path);
                }
            }

            Media::where('mediable_type', $mediableType)
                ->where('mediable_id', $id)
                ->whereIn('id', $mediaIds)
                ->delete();
        });
    }

    public function updatePackageImageMeta(int $id, array $meta): void
    {
        $mediableType = (new Package)->getMorphClass();

        DB::transaction(function () use ($id, $meta, $mediableType) {
            foreach ($meta as $item) {
                Media::where('mediable_type', $mediableType)
                    ->where('mediable_id', $id)
                    ->where('id', $item['id'])
                    ->update([
                        'is_primary' => $item['is_primary'],
                        'order_number' => $item['order'],
                    ]);
            }
        });
    }



    public function getPackagesStatisticData()
    {
        return Package::getDashboardMetrics();
    }
}
