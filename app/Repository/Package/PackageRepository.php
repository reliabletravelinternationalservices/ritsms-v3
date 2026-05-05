<?php

namespace App\Repository\Package;

use App\Models\Package;
use App\Models\PackageGroup;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

use function Termwind\parse;

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

    // GET FEATURED INBOUND PACKAGES: get every package included in groups that display in inbound, distinct to avoid duplication
    public function getFeaturedInboundPackages(): array
    {
        $groups = PackageGroup::where('include_as_inbound', true)
            ->where('is_featured', true)
            ->with('packages.primaryImage')
            ->get();

        $packages = $groups->pluck('packages')->flatten()->unique('id');
        $isForeignOnly = $packages->every(fn ($package) => $package->is_foreign_only);

        return [
            'packages' => $packages,
            'is_foreign_only' => $isForeignOnly,
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
        $isForeignOnly = $packages->every(fn ($package) => $package->is_foreign_only);

        return [
            'packages' => $packages,
            'is_foreign_only' => $isForeignOnly,
        ];
    }


    public function getPackageDetails(int $id): Package
    {
        return $this->model->with('schedules')->findOrFail($id);
    }
}
