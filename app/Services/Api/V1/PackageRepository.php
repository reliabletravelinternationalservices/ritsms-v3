<?php

namespace App\Services\Api\V1;

use App\Models\Package;
use App\Models\PackageGroup;
use Illuminate\Support\Arr;

class PackageRepository
{



    public function fetchPackages(array $filters = [])
    {
        try {
            $data = Package::query()
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

                ->when(
                    Arr::get($filters, 'destination'),
                    fn ($query, $destination) => $query->where('destination', $destination)
                )

                ->when(
                    Arr::get($filters, 'duration'),
                    fn ($query, $duration) => $query->where('duration', $duration)
                )

                ->when(
                    Arr::get($filters, 'name'),
                    fn ($query, $name) => $query->where('name', 'like', "%{$name}%")
                )

                ->when(
                    Arr::has($filters, 'isForeignOnly'),
                    function ($query) use ($filters) {
                        $query->where(
                            'is_foreign_only',
                            filter_var(
                                Arr::get($filters, 'isForeignOnly'),
                                FILTER_VALIDATE_BOOLEAN
                            )
                        );
                    }
                )

                ->when(
                    Arr::has($filters, 'priceRange'),
                    function ($query) use ($filters) {
                        $query->whereBetween('base_price', [
                            Arr::get($filters, 'priceRange.min', 0),
                            Arr::get($filters, 'priceRange.max', PHP_INT_MAX),
                        ]);
                    }
                )
                ->latest()
                ->paginate(Arr::get($filters, 'perPage', 10));

            if ($data->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No packages found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Packages retrieved successfully.',
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    public function fetchGroupedPackages(array $filters = [])
    {
        try {
            $data = PackageGroup::query()
                ->select([
                    'id',
                    'title',
                    'description',
                    'include_as_outbound',
                    'include_as_inbound',
                    'is_featured',
                    'tag',
                    'created_at',
                    'updated_at',
                ])
                ->with([
                    'packages:id,slug,name,base_price,duration,destination,description,created_at,updated_at',
                    'packages.primaryImage:id,mediable_id,mediable_type,file_name,file_path,alt_text',
                ])

                // Search by title
                ->when(
                    filled(Arr::get($filters, 'title')),
                    fn ($query) => $query->where(
                        'title',
                        'like',
                        '%' . Arr::get($filters, 'title') . '%'
                    )
                )

                // Filter inbound
                ->when(
                    Arr::has($filters, 'isInbound'),
                    fn ($query) => $query->where(
                        'include_as_inbound',
                        filter_var(
                            Arr::get($filters, 'isInbound'),
                            FILTER_VALIDATE_BOOLEAN
                        )
                    )
                )

                // Filter outbound
                ->when(
                    Arr::has($filters, 'isOutbound'),
                    fn ($query) => $query->where(
                        'include_as_outbound',
                        filter_var(
                            Arr::get($filters, 'isOutbound'),
                            FILTER_VALIDATE_BOOLEAN
                        )
                    )
                )

                // Filter featured
                ->when(
                    Arr::has($filters, 'isFeatured'),
                    fn ($query) => $query->where(
                        'is_featured',
                        filter_var(
                            Arr::get($filters, 'isFeatured'),
                            FILTER_VALIDATE_BOOLEAN
                        )
                    )
                )

                ->orderByDesc('is_featured')
                ->orderByDesc('created_at')

                ->paginate(
                    Arr::get($filters, 'perPage', 10)
                );

            return response()->json([
                'success' => true,
                'message' => $data->isEmpty()
                    ? 'No package groups found.'
                    : 'Package groups retrieved successfully.',
                'data' => $data,
            ], $data->isEmpty() ? 404 : 200);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}