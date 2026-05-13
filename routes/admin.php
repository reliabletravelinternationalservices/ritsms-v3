<?php

use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Package\CreatePackageController;
use App\Http\Controllers\Admin\Package\ServicePackageController;
use Illuminate\Support\Facades\Route;

// OUTBOUND DESTINATIONS
Route::prefix('admin')->middleware('adminAuth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::prefix('packages')->group(function () {
        Route::get('/', [ServicePackageController::class, 'index'])->name('admin.packages');

        Route::get('/create', [CreatePackageController::class, 'index'])->name('admin.packages.create');
        Route::get('/store', [CreatePackageController::class, 'store'])->name('admin.packages.store');
    });

});
