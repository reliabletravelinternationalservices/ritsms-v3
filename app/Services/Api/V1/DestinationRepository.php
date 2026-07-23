<?php

namespace App\Services\Api\V1;

use App\Models\Destination;
use Illuminate\Support\Arr;

class DestinationRepository
{

    public function fetchCountries(array $params = [])
    {
        // Only allow supported parameters
        $params = Arr::only($params, [
            'countryName',
            'perPage',
            'with',
            'with.locations',
        ]);

        try {
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

            if (filled(Arr::get($params, 'perPage'))) {
                $data = $query->paginate((int) Arr::get($params, 'perPage'));
            } else {
                $data = $query->get();
            }

            $isEmpty = $data instanceof \Illuminate\Contracts\Pagination\Paginator
                ? $data->isEmpty()
                : $data->isEmpty();

            if ($isEmpty) {
                return response()->json([
                    'success' => false,
                    'message' => 'No countries found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Countries retrieved successfully.',
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


    public function fetchCountry(string $country)
    {
        try {
            $data = Destination::query()
                ->select('id', 'country', 'title', 'tag', 'description')
                ->with([
                    'image:id,file_name,file_path,alt_text',
                ])
                ->where('country', $country)
                ->first();

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Country not found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Country retrieved successfully.',
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


    public function fetchCountriesNames()
    {
        try {
            $data = Destination::query()
                ->select('id', 'country')
                ->distinct()
                ->orderBy('country', 'asc')
                ->get();

            if ($data->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No countries found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Countries names retrieved successfully.',
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



    public function fetchCountryLocations(string $country)
    {
        try {
            $data = Destination::query()
                ->select('id', 'country', 'title', 'tag', 'description')
                ->with([
                    'image:id,mediable_id,mediable_type,file_name,file_path,alt_text',
                    'locations:id,destination_id,name',
                    'locations.image:id,mediable_id,mediable_type,file_name,file_path,alt_text',
                ])
                ->where('country', $country)
                ->first();

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Country not found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Country locations retrieved successfully.',
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
}