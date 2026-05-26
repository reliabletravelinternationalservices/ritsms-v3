<?php

use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Destination\ServiceCountryController;
use App\Http\Controllers\Admin\Package\CreatePackageController;
use App\Http\Controllers\Admin\Package\CreatePackageGroupController;
use App\Http\Controllers\Admin\Package\DeletePackageController;
use App\Http\Controllers\Admin\Package\DeletePackageGroupController;
use App\Http\Controllers\Admin\Package\EditPackageController;
use App\Http\Controllers\Admin\Package\EditPackageGroupController;
use App\Http\Controllers\Admin\Package\FeaturePackageGroupController;
use App\Http\Controllers\Admin\Package\PackageDetailsController;
use App\Http\Controllers\Admin\Package\PackageGroupDisplayController;
use App\Http\Controllers\Admin\Package\PackageGroupPinController;
use App\Http\Controllers\Admin\Package\PackageImageController;
use App\Http\Controllers\Admin\Package\ServicePackageController;
use Illuminate\Support\Facades\Route;

// OUTBOUND DESTINATIONS
Route::prefix('admin')->middleware('adminAuth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::prefix('packages')->group(function () {
        Route::get('/', [ServicePackageController::class, 'index'])->name('admin.packages');

        Route::get('/{id}/details', [PackageDetailsController::class, 'index'])->name('admin.packages.details');

        Route::get('/create', [CreatePackageController::class, 'index'])->name('admin.packages.create');
        Route::post('/store', [CreatePackageController::class, 'store'])->name('admin.packages.store');

        Route::get('/edit/{id}', [EditPackageController::class, 'index'])->name('admin.packages.edit');
        Route::put('/update/{id}', [EditPackageController::class, 'update'])->name('admin.packages.update');

        Route::delete('/destroy/{id}', [DeletePackageController::class, 'destroy'])->name('admin.packages.destroy');

        Route::prefix('images')->group(function () {
            Route::post('/store/{id}', [PackageImageController::class, 'store'])->name('admin.packages.images.store');
            Route::put('/update/{id}', [PackageImageController::class, 'update'])->name('admin.packages.images.update');
        });
    });

    Route::prefix('packageGroups')->group(function () {
        Route::get('/', [PackageGroupDisplayController::class, 'index'])->name('admin.packages.groups');
        Route::get('/create', [CreatePackageGroupController::class, 'index'])->name('admin.packages.groups.create');
        Route::post('/store', [CreatePackageGroupController::class, 'store'])->name('admin.packages.groups.store');
        
        Route::get('/edit/{id}', [EditPackageGroupController::class, 'index'])->name('admin.packages.groups.edit');
        Route::put('/update/{id}', [EditPackageGroupController::class, 'update'])->name('admin.packages.groups.update');
        Route::put('/feature/{id}', [FeaturePackageGroupController::class, 'toggle'])->name('admin.packages.groups.feature');
        Route::delete('/destroy/{id}', [DeletePackageGroupController::class, 'destroy'])->name('admin.packages.groups.destroy');

        Route::get('/pin/{id}', [PackageGroupPinController::class, 'index'])->name('admin.packages.groups.pin');
        Route::put('/pin/update/{id}', [PackageGroupPinController::class, 'update'])->name('admin.packages.groups.pin.update');
    });


    Route::prefix('destinations')->group(function () {
        Route::get('/', [ServiceCountryController::class, 'index'])->name('admin.destinations');
        Route::get('/{destination}', [ServiceCountryController::class, 'show'])->name('admin.destinations.show');
    });

});
