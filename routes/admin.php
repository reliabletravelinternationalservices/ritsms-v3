<?php

use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Package\CreatePackageController;
use App\Http\Controllers\Admin\Package\PackageDetailsController;
use App\Http\Controllers\Admin\Package\PackageGroupDisplayController;
use App\Http\Controllers\Admin\Package\ServicePackageController;
use Illuminate\Support\Facades\Route;

// OUTBOUND DESTINATIONS
Route::prefix('admin')->middleware('adminAuth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::prefix('packages')->group(function () {
        Route::get('/', [ServicePackageController::class, 'index'])->name('admin.packages');

        Route::get('/{id}', [PackageDetailsController::class, 'index'])->name('admin.packages.details');
        Route::get('/groups', [PackageGroupDisplayController::class, 'index'])->name('admin.packages.groups');

        Route::get('/create', [CreatePackageController::class, 'index'])->name('admin.packages.create');
        Route::post('/store', [CreatePackageController::class, 'store'])->name('admin.packages.store');
    });

});
