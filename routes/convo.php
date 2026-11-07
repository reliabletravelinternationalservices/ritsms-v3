<?php

use App\Http\Controllers\Convo\ConvoController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->name('convo.')->group(function () {
    Route::controller(ConvoController::class)->group(function () {
        Route::get('/', 'getConvos')->name('list');
    });
});
