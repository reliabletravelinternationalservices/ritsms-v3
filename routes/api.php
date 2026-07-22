<?php

use App\Http\Controllers\Api\V1\Public\DestinationController;
use App\Http\Controllers\Api\V1\Public\PackageController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {

    Route::middleware('throttle:countries')->group(function () {
        Route::get('countries', [DestinationController::class, 'getCountries']);
        Route::get('countries/{country}', [DestinationController::class, 'getCountry']);
    });

    Route::middleware('throttle:packages')->group(function () {
        Route::get('packages', [PackageController::class, 'getPackages']);
        Route::get('packages/groups', [PackageController::class, 'getGroupedPackage']);
    });

});