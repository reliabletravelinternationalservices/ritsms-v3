<?php

use App\Http\Controllers\Client\LandingPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->name('client.landing');