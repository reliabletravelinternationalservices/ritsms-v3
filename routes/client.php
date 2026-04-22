<?php

use App\Http\Controllers\Client\DestinationPageController;
use App\Http\Controllers\Client\LandingPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->name('client.landing');
Route::get('/destination', [DestinationPageController::class, 'index'])->name('client.destination');