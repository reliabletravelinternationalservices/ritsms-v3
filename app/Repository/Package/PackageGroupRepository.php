<?php

namespace App\Repository\Package;

use App\Models\Media;
use App\Models\PackageGroup;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PackageGroupRepository
{
    public function __construct(protected PackageGroup $model) {}

    public function createGroup(array $data): PackageGroup
    {
        return DB::transaction(function () use ($data) {
            return $this->model->create($data);
        });
    }

    public function updateGroup(int $groupID, array $data): PackageGroup
    {
        $group = $this->model->findOrFail($groupID);
        $image = Arr::pull($data, 'image');

        DB::transaction(function () use ($group, $data, $image) {
            $group->update($data);

            if ($image instanceof UploadedFile) {
                $this->deletePackageGroupImage($group->id);
                $this->storePackageGroupImage($group->id, ['image' => $image]);
            }
        });

        return $group->fresh('image');
    }

    public function deleteGroup(int $groupID): void
    {
        $group = $this->model->findOrFail($groupID);

        DB::transaction(function () use ($group) {
            $this->deletePackageGroupImage($group->id);
            $group->delete();
        });
    }

    public function toggleGroupFeatured(int $groupID): PackageGroup
    {
        $group = $this->model->findOrFail($groupID);
        $group->update(['is_featured' => ! $group->is_featured]);

        return $group->fresh();
    }

    public function deletePackageGroupImage(int $groupID): void
    {
        $morphClass = $this->model->getMorphClass();
        $media = Media::where('mediable_type', $morphClass)
            ->where('mediable_id', $groupID)
            ->first();

        if (! $media) {
            return;
        }

        Storage::disk('public')->delete($media->file_path);
        $media->delete();
    }

    public function createManyGroup(array $data): Collection
    {
        return collect($data)->map(fn (array $item) => $this->createGroup($item));
    }

    // ADDING ITEMS(PACKAGE) TO GROUP
    public function addGroupItem(array $data)
    {
        $groupID = $data['package_group_id'];
        $packageID = $data['package_id'];
        $orderNumber = $data['order_number'];
        $group = $this->model->findOrFail($groupID);

        return DB::transaction(function () use ($group, $packageID, $orderNumber) {
            return $group->packages()->attach($packageID, ['order_number' => $orderNumber]);
        });
    }

    public function addManyGroupItem(array $data)
    {
        return collect($data)->map(fn (array $item) => $this->addGroupItem($item));
    }

    public function getPackageGroupByType(string $type = 'outbound', bool $isFeatured = false): Collection
    {
        // Determine which column to filter based on the type string
        $column = ($type === 'inbound') ? 'include_as_inbound' : 'include_as_outbound';

        return $this->model
            ->where($column, true)
            ->where('is_featured', $isFeatured)
            ->with(['packages.primaryImage'])
            ->get();
    }

    public function getPackageGroupByID(int $id): PackageGroup
    {
        return $this->model
            ->with(['image', 'packages.primaryImage']) // Nested eager loading
            ->findOrFail($id);
    }

    public function getPackageGroupBySlug(string $slug): PackageGroup
    {
        return $this->model
            ->with(['image', 'packages.primaryImage']) // Nested eager loading
            ->where('slug', $slug)
            ->firstOrFail();
    }

    /**
     * Get all package groups with their representative image and packages.
     * Returns a Collection of PackageGroup models ready for UI consumption.
     */
    public function getAllGroups(): Collection
    {
        return $this->model
            ->with(['image', 'packages.primaryImage', 'packages.schedules'])
            ->orderBy('updated_at', 'desc')
            ->get();
    }

    public function storePackageGroupImage(int $groupID, array $image)
    {
        $morphClass = $this->model->getMorphClass();
        $file = $image['image'];
        $path = $file->store('upload/package_group', 'public');

        return DB::transaction(function () use ($groupID, $file, $path, $morphClass) {
            return Media::create([
                'mediable_id' => $groupID,
                'mediable_type' => $morphClass,
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'alt_text' => $file->getClientOriginalName(),
                'url' => Storage::url($path), // Clean alternative that resolves IDE method errors
                'disk' => 'local',
                'type' => 'image',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'order_number' => 1,
                'is_primary' => true,
            ]);
        });
    }



    public function updateGroupPinnedPackages(int $id, array $pinnedPackages)
    {
        $group = $this->model->findOrFail($id);

        return DB::transaction(function () use ($group, $pinnedPackages) {
            $syncData = collect($pinnedPackages)->mapWithKeys(fn ($item) => [
                $item['package_id'] => ['order_number' => $item['order_number']],
            ])->toArray();

            $group->packages()->sync($syncData);
            $group->touch();
            return $group->fresh('packages');
        });
    }
}
