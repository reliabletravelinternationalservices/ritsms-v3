<?php

namespace App\Repository\Package;

use App\Models\Package;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PackageRepository
{
    public function __construct(protected Package $model){}

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

}