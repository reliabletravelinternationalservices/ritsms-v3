<?php

namespace App\Repository\Package;

use App\Models\PackageGroup;
use App\Models\PackageSchedule;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PackageScheduleRepository
{
    public function __construct(protected PackageSchedule $model) {}

    public function createPackageSchedule(array $data): PackageSchedule
    {
        return DB::transaction(function () use ($data) {
            return $this->model->create($data);
        });
    }

    public function createManyPackageSchedule(array $data): Collection
    {
        return collect($data)->map(fn (array $item) => $this->createPackageSchedule($item));
    }

}
