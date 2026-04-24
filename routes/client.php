<?php

use App\Http\Controllers\Client\ContactPageController;
use App\Http\Controllers\Client\DestinationPageController;
use App\Http\Controllers\Client\LandingPageController;
use App\Http\Controllers\Client\OutboundDestinationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->name('client.landing');

Route::prefix('destination')->group(function () {
    Route::get('/', [DestinationPageController::class, 'index'])->name('client.destination');

    // OUTBOUND DESTINATIONS
    Route::prefix('outbound')->group(function () {
        Route::get('/', [OutboundDestinationController::class, 'index'])->name('client.destination.outbound');
    });
});

Route::get('/contact', [ContactPageController::class, 'index'])->name('client.contact');