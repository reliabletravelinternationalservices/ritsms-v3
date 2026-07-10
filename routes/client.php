<?php

use App\Http\Controllers\Client\About\AboutUsController;
use App\Http\Controllers\Client\ContactPageController;
use App\Http\Controllers\Client\Destination\DestinationPageController;
use App\Http\Controllers\Client\InboundPageController;
use App\Http\Controllers\Client\Home\LandingPageController;
use App\Http\Controllers\Client\Message\InquiryResultController;
use App\Http\Controllers\Client\OutboundPageController;
use App\Http\Controllers\Client\Package\PackageDetailController;
use App\Http\Controllers\Client\Package\PackageGroupController;
use App\Http\Controllers\Client\Policy\InquiryPolicyController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->name('client.landing');

// DESTINATIONS
Route::prefix('destination')->group(function () {
    Route::get('/', [DestinationPageController::class, 'index'])->name('client.destination');
    Route::prefix('country')->group(function () {
        Route::get('/', [DestinationPageController::class, 'countries'])->name('client.destination.countries');
        Route::get('/{destination}', [DestinationPageController::class, 'country'])->name('client.destination.country');
    });
});

// OUTBOUND DESTINATIONS
Route::prefix('outbound')->group(function () {
    Route::get('/', [OutboundPageController::class, 'index'])->name('client.outbound');

    Route::prefix('group')->group(function () {
        Route::get('/{id}', [PackageGroupController::class, 'index'])->name('client.outbound.package.group');
    });

    Route::prefix('package')->group(function () {
        Route::get('/{slug}', [PackageDetailController::class, 'index'])->name('client.outbound.package.detail');
    });
});

// INBOUND DESTINATIONS
Route::prefix('inbound')->group(function () {
    Route::get('/', [InboundPageController::class, 'index'])->name('client.inbound');

    Route::prefix('group')->group(function () {
        Route::get('/{id}', [PackageGroupController::class, 'index'])->name('client.inbound.package.group');
    });

    Route::prefix('package')->group(function () {
        Route::get('/{slug}', [PackageDetailController::class, 'index'])->name('client.inbound.package.detail');
    });
});

Route::prefix('inquiry')->group(function () {
    Route::post('/store', [InquiryResultController::class, 'store'])->name('client.inquiry.store')->middleware('throttle:5,10');
    Route::get('/success', [InquiryResultController::class, 'index'])->name('client.inquiry.success');
    Route::get('/policy', [InquiryPolicyController::class, 'index'])->name('client.inquiry.policy');
});




Route::get('/contact', [ContactPageController::class, 'index'])->name('client.contact');
Route::get('/about', [AboutUsController::class, 'index'])->name('client.about');
