<?php

namespace App\Services\Api\V1;

use App\Models\Destination;
use Illuminate\Support\Arr;

class DestinationRepository
{

    public function fetchCountries(array $params = [])
    {

        $query = Destination::query()
            ->select([
                'id',
                'country',
                'tag',
                'created_at',
                'updated_at',
            ])
            ->with([
                'image:id,mediable_id,mediable_type,file_name,file_path,alt_text',
            ])
            ->withCount('locations')
            ->distinct();

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        // Search country
        $query->when(
            filled(Arr::get($params, 'countryName')),
            fn ($q) => $q->where(
                'country',
                'like',
                '%' . Arr::get($params, 'countryName') . '%'
            )
        );

        // Filter by tag
        $query->when(
            filled(Arr::get($params, 'tag')),
            fn ($q) => $q->where(
                'tag',
                Arr::get($params, 'tag')
            )
        );

        /*
        |--------------------------------------------------------------------------
        | Relationships
        |--------------------------------------------------------------------------
        */

        if (filter_var(Arr::get($params, 'with.locations', false), FILTER_VALIDATE_BOOLEAN)) {
            $query->with([
            'locations' => fn ($q) => $q->with('image:id,mediable_id,mediable_type,file_name,file_path,alt_text')->latest(),
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

        if (
            filled(Arr::get($params, 'perPage')) ||
            filled(Arr::get($params, 'page'))
        ) {
            $data = $query->paginate(
                perPage: (int) Arr::get($params, 'perPage', 10),
                columns: ['*'],
                pageName: 'page',
                page: (int) Arr::get($params, 'page', 1),
            );
        } else {
            $data = $query->get();
        }

        return $data;
    }


}