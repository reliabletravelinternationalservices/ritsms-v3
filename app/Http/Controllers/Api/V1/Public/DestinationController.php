<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Services\Api\V1\DestinationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class DestinationController extends Controller
{
    public function __construct(private DestinationRepository $repo) {}
    public function getCountries(Request $request)
    {

        try {

            $data = $this->repo->fetchCountries($request->all());

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
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}
