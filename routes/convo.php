<?php

use App\Http\Controllers\Convo\ConvoController;
use App\Http\Controllers\Convo\CreateMessageController;
use App\Http\Controllers\Convo\MessageController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix('convo')->name('convo.')->group(function () {
    Route::controller(ConvoController::class)->group(function () {
        Route::get('/list', 'getConvos')->name('list');
    });


    Route::controller(MessageController::class)->group(function () {
        Route::get('/{convo}/messages', 'getMessages')->name('messages');
    });


    Route::controller(CreateMessageController::class)->group(function () {
        Route::post('/{convo}/message', 'store')->name('message.store');
    });
});
