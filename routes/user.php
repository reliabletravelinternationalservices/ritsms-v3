<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix('users')->name('users.')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('/contacts/search', 'searchContacts')->name('contacts');
    });
});
