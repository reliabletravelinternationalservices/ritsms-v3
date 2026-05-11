<?php

use App\Http\Controllers\Admin\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

// OUTBOUND DESTINATIONS
Route::prefix('admin')->middleware('adminAuth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
});
