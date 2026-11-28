<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Destination\GetCountriesRequest;
use App\Http\Resources\Destination\DestinationResource;
use App\Services\Api\V1\DestinationRepository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function __construct(private DestinationRepository $repo) {}

    public function getCountries(GetCountriesRequest $request)
    {
        try {
            $filters = $request->validated();

            // Generate a unique cache key based on filters
            $cacheKey = 'api:countries:' . md5(json_encode($filters));

            $data = Cache::tags(['countries'])->remember(
                $cacheKey,
                now()->addHours(24),
                fn () => $this->repo->fetchCountries($filters)
            );

            if ($data->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No countries found.',
                    'data' => [],
                ], 404);
            }

            return DestinationResource::collection($data)->additional([
                'success' => true,
                'message' => 'Countries retrieved successfully.',
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
