<?php

namespace App\Repository\Package;

use App\Models\PackageGroup;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PackageGroupRepository
{
    public function __construct(protected PackageGroup $model) {}

    public function createGroup(array $data): PackageGroup
    {
        return DB::transaction(function () use ($data) {
            return $this->model->create($data);
        });
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
}
