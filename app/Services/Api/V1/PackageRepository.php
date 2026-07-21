<?php

namespace App\Services\Api\V1;

use App\Models\Package;

class PackageRepository
{
    public function fetchPackages()
    {


        try {
            $data = Package::query()
            ->select(
                'id', 
                'slug', 
                'name', 
                'base_price', 
                'duration', 
                'destination',
                'description', 
                'created_at',
                'updated_at',
                )
            ->with(['primaryImage:id,mediable_id,mediable_type,file_name,file_path,alt_text',])
            ->orderBy('created_at', 'desc')
            ->get();

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


    public function fetchInboundOutboundPackages(bool $isForeignOnly = false)
    {

        try {
            $data = Package::query()
            ->select(
                'id', 
                'slug', 
                'name', 
                'base_price', 
                'duration', 
                'destination',
                'description', 
                'created_at',
                'updated_at',
                )
            ->with(['primaryImage:id,mediable_id,mediable_type,file_name,file_path,alt_text',])
            ->where('is_foreign_only', $isForeignOnly)
            ->orderBy('created_at', 'desc')
            ->get();

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

}