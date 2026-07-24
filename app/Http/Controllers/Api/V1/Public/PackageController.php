<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Api\V1\PackageRepository;
use Illuminate\Support\Arr;

class PackageController extends Controller
{
    public function __construct(private PackageRepository $repo) {}
    public function getPackages(Request $request)
    {

        try {

            $data =  $this->repo->fetchPackages($request->all());

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

    public function getGroupedPackage(Request $request)
    {
        
        try {
            $data =  $this->repo->fetchGroupedPackages($request->all());

            if ($data->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No package groups found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Package groups retrieved successfully.',
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
