<?php

use App\Http\Controllers\Admin\Booking\BookingManagementController;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Destination\CreateDestinationController;
use App\Http\Controllers\Admin\Destination\CreateLocationController;
use App\Http\Controllers\Admin\Destination\DeleteDestinationController;
use App\Http\Controllers\Admin\Destination\DeleteLocationController;
use App\Http\Controllers\Admin\Destination\EditDestinationController;
use App\Http\Controllers\Admin\Destination\EditLocationController;
use App\Http\Controllers\Admin\Destination\ServiceCountryController;
use App\Http\Controllers\Admin\Inquiry\ClientsInquiryController;
use App\Http\Controllers\Admin\Inquiry\InquiryDetailController;
use App\Http\Controllers\Admin\Log\ActivityLogController;
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
use App\Http\Controllers\Admin\Package\UpdateTravelBatchController;
use Illuminate\Support\Facades\Route;

// OUTBOUND DESTINATIONS
Route::prefix('admin')->middleware('adminAuth')->group(function () {
    Route::redirect('/dashboard', '/admin/dashboard');
    Route::redirect('/admin', '/admin/dashboard');

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

        Route::prefix('{id}/travelBatches')->group(function () {
            Route::get('/create', [UpdateTravelBatchController::class, 'create'])->name('admin.packages.batches.create');
            Route::post('/store', [UpdateTravelBatchController::class, 'store'])->name('admin.packages.batches.store');
            Route::get('/{scheduleId}/edit', [UpdateTravelBatchController::class, 'edit'])->name('admin.packages.batches.edit');
            Route::put('/{scheduleId}', [UpdateTravelBatchController::class, 'update'])->name('admin.packages.batches.update');
            Route::delete('/{scheduleId}', [UpdateTravelBatchController::class, 'destroy'])->name('admin.packages.batches.destroy');
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
        Route::get('/{id}/details', [ServiceCountryController::class, 'show'])->name('admin.destinations.details');

        Route::get('/create', [CreateDestinationController::class, 'index'])->name('admin.destinations.create');
        Route::post('/store', [CreateDestinationController::class, 'store'])->name('admin.destinations.store');

        Route::get('/edit/{id}', [EditDestinationController::class, 'index'])->name('admin.destinations.edit');
        Route::put('/update/{id}', [EditDestinationController::class, 'update'])->name('admin.destinations.update');

        Route::delete('/destroy/{id}', [DeleteDestinationController::class, 'destroy'])->name('admin.destinations.destroy');

        Route::prefix('{destID}/locations')->group(function () {
            Route::get('/create', [CreateLocationController::class, 'index'])->name('admin.destinations.locations.create');
            Route::post('/store', [CreateLocationController::class, 'store'])->name('admin.destinations.locations.store');

            Route::get('/edit/{id}', [EditLocationController::class, 'index'])->name('admin.destinations.locations.edit');
            Route::put('/update/{id}', [EditLocationController::class, 'update'])->name('admin.destinations.locations.update');

            Route::delete('/destroy/{id}', [DeleteLocationController::class, 'destroy'])->name('admin.destinations.locations.destroy');
        });
    });

    Route::prefix('inquiries')->group(function () {
        Route::get('/', [ClientsInquiryController::class, 'index'])->name('admin.inquiries');
        Route::get('/{id}/details', [InquiryDetailController::class, 'index'])->name('admin.inquiries.details');
        Route::patch('/{id}/patch', [ClientsInquiryController::class, 'patch'])->name('admin.inquiries.status.update');
        Route::delete('/destroy/{id}', [ClientsInquiryController::class, 'destroy'])->name('admin.inquiries.destroy');
    });

    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingManagementController::class, 'index'])->name('admin.bookings');
    });

    Route::prefix('logs')->group(function () {
        Route::get('/', [ActivityLogController::class, 'index'])->name('admin.logs');
    });
});
