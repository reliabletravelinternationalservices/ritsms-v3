<?php

namespace App\Services\Api\V1;

use App\Models\Destination;


class DestinationRepository
{
    public function fetchCountries()
    {
        try {
            $data = Destination::query()
                ->select('id', 'country', 'tag', 'created_at', 'updated_at')
                ->with([
                    'image:id,mediable_id,mediable_type,file_name,file_path,alt_text',
                ])
                ->withCount('locations')
                ->distinct()
                ->orderBy('created_at', 'desc')
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
}