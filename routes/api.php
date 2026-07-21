<?php

use App\Http\Controllers\Api\V1\Public\DestinationController;
use App\Http\Controllers\Api\V1\Public\PackageController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'api/v1'], function () {
    Route::get('countries', [DestinationController::class, 'getCountries']);
    Route::get('countries/{country}', [DestinationController::class, 'getCountry']);
    Route::get('packages', [PackageController::class, 'getPackages']);
    Route::get('packages/outbound', [PackageController::class, 'getOutboundPackages']);
    Route::get('packages/inbound', [PackageController::class, 'getInboundPackages']);
});