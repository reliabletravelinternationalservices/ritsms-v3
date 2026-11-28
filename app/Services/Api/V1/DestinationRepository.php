<?php

namespace App\Services\Api\V1;

use App\Models\Destination;
use Illuminate\Support\Arr;

class DestinationRepository
{

    public function fetchCountries(array $params = [])
    {
        // Only allow supported parameters
        $filters = Arr::only($params, [
            'countryName',
            'tag',
            'page',
            'perPage',
            'with',
        ]);

        $query = Destination::query()
            ->select([
                'id',
                'country',
                'tag',
                'slug',
            ])
            ->with([
                'image:id,mediable_id,mediable_type,file_name,file_path,alt_text',
            ])
            ->withCount('locations');

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        // Search country
        $query->when(
            filled(Arr::get($filters, 'countryName')),
            fn ($q) => $q->where(
                'country',
                'like',
                '%' . Arr::get($filters, 'countryName') . '%'
            )
        );

        // Filter by tag
        $query->when(
            filled(Arr::get($filters, 'tag')),
            fn ($q) => $q->where('tag', Arr::get($filters, 'tag'))
        );

        /*
        |--------------------------------------------------------------------------
        | Relationships
        |--------------------------------------------------------------------------
        */

        if (filter_var(
            Arr::get($filters, 'with.locations', false),
            FILTER_VALIDATE_BOOLEAN
        )) {
            $query->with([
                'locations' => fn ($q) => $q
                    ->with('image:id,mediable_id,mediable_type,file_name,file_path,alt_text')
                    ->latest(),
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Sorting
        |--------------------------------------------------------------------------
        */

        $query->orderBy('country');

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        $perPage = max(1, min((int) Arr::get($filters, 'perPage', 10), 100));
        $page = max(1, (int) Arr::get($filters, 'page', 1));

        if (
            filled(Arr::get($filters, 'perPage')) ||
            filled(Arr::get($filters, 'page'))
        ) {
            return $query->paginate(
                perPage: $perPage,
                page: $page,
            );
        }

        return $query->get();
    }


}