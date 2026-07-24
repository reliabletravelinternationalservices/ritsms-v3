<?php

namespace App\Services\Api\V1;

use App\Models\Package;
use App\Models\PackageGroup;
use Illuminate\Support\Arr;

class PackageRepository
{

    public function fetchPackages(array $params = [])
    {
        $filters = Arr::only($params, [
            'destination',
            'duration',
            'name',
            'isForeignOnly',
            'priceRange',
            'priceRange.min',
            'priceRange.max',
            'page',
            'perPage',
            'groupID',
        ]);

        $destination = Arr::get($filters, 'destination');
        $duration = Arr::get($filters, 'duration');
        $name = Arr::get($filters, 'name');
        $isForeignOnly = Arr::has($filters, 'isForeignOnly')
            ? filter_var(Arr::get($filters, 'isForeignOnly'), FILTER_VALIDATE_BOOLEAN)
            : null;

        $minPrice = Arr::get($filters, 'priceRange.min');
        $maxPrice = Arr::get($filters, 'priceRange.max');

        return Package::query()
            ->select([
                'id',
                'slug',
                'name',
                'base_price',
                'duration',
                'destination',
                'description',
                'created_at',
                'updated_at',
            ])
            ->with([
                'primaryImage:id,mediable_id,mediable_type,file_name,file_path,alt_text',
            ])
            ->when($destination, fn($q) => $q->where('destination', $destination))
            ->when($duration, fn($q) => $q->where('duration', $duration))
            ->when($name, fn($q) => $q->where('name', 'like', "%{$name}%"))
            ->when(
                $isForeignOnly !== null,
                fn($q) => $q->where('is_foreign_only', $isForeignOnly)
            )
            ->when(
                $minPrice !== null || $maxPrice !== null,
                fn($q) => $q->whereBetween('base_price', [
                    $minPrice ?? 0,
                    $maxPrice ?? PHP_INT_MAX,
                ])
            )
            ->when(
                filled(Arr::get($filters, 'groupID')),
                fn ($q) => $q->whereHas('packageGroups', function ($query) use ($filters) {
                    $query->where('package_groups.id', Arr::get($filters, 'groupID'));
                })
            )
            ->latest()
            ->paginate(
                perPage: (int) Arr::get($filters, 'perPage', 10),
                columns: ['*'],
                pageName: 'page',
                page: (int) Arr::get($filters, 'page', 1),
            );
    }

    public function fetchGroupedPackages(array $params = [])
    {
        $filters = Arr::only($params, [
            'title',
            'tag',
            'isInbound',
            'isOutbound',
            'isFeatured',
            'page',
            'perPage',
        ]);

        $title = Arr::get($filters, 'title');
        $tag = Arr::get($filters, 'tag');

        $isInbound = Arr::has($filters, 'isInbound')
            ? filter_var(Arr::get($filters, 'isInbound'), FILTER_VALIDATE_BOOLEAN)
            : null;

        $isOutbound = Arr::has($filters, 'isOutbound')
            ? filter_var(Arr::get($filters, 'isOutbound'), FILTER_VALIDATE_BOOLEAN)
            : null;

        $isFeatured = Arr::has($filters, 'isFeatured')
            ? filter_var(Arr::get($filters, 'isFeatured'), FILTER_VALIDATE_BOOLEAN)
            : null;

        return PackageGroup::query()
            ->select([
                'id',
                'title',
                'description',
                'include_as_outbound',
                'include_as_inbound',
                'is_featured',
                'tag',
                'slug',
                'created_at',
                'updated_at',
            ])
            ->with([
                'packages:id,slug,name,base_price,duration,destination,description,created_at,updated_at',
                'packages.primaryImage:id,mediable_id,mediable_type,file_name,file_path,alt_text',
            ])
            ->when(
                $title,
                fn($q) => $q->where('title', 'like', "%{$title}%")
            )
            ->when(
                $tag,
                fn($q) => $q->where('tag', $tag)
            )
            ->when(
                $isInbound !== null,
                fn($q) => $q->where('include_as_inbound', $isInbound)
            )
            ->when(
                $isOutbound !== null,
                fn($q) => $q->where('include_as_outbound', $isOutbound)
            )
            ->when(
                $isFeatured !== null,
                fn($q) => $q->where('is_featured', $isFeatured)
            )
            ->orderByDesc('is_featured')
            ->latest()
            ->paginate(
                perPage: (int) Arr::get($filters, 'perPage', 10),
                columns: ['*'],
                pageName: 'page',
                page: (int) Arr::get($filters, 'page', 1),
            );
    }
}
