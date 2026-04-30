<?php

namespace App\Repository\Package;

use App\Models\Package;
use Illuminate\Support\Collection;

class PackageRepository
{
    public function create(array $data): Package
    {
        return Package::create($data);
    }

    public function createMany(array $data): Collection
    {
        return collect($data)->map(fn (array $item) => $this->create($item));
    }
}