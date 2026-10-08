<?php

use App\Http\Controllers\Client\About\AboutUsController;
use App\Http\Controllers\Client\Auth\LoginController;
use App\Http\Controllers\Client\Auth\LogoutController;
use App\Http\Controllers\Client\Auth\SignupController;
use App\Http\Controllers\Client\ChatSession\ChatMessageController;
use App\Http\Controllers\Client\ChatSession\ChatSessionController;
use App\Http\Controllers\Client\Contact\ContactPageController;
use App\Http\Controllers\Client\Conversation\CreateConversationController;
use App\Http\Controllers\Client\Destination\DestinationPageController;
use App\Http\Controllers\Client\Home\LandingPageController;
use App\Http\Controllers\Client\InboundPageController;
use App\Http\Controllers\Client\Inbox\MessageInboxController;
use App\Http\Controllers\Client\Message\InquiryResultController;
use App\Http\Controllers\Client\Outbound\OutboundPageController;
use App\Http\Controllers\Client\Policy\InquiryPolicyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/updateTable', [LandingPageController::class, 'updateTableData'])->name('client.update');

// DESTINATIONS

Route::name('client.')->group(function () {

    Route::get('/', [LandingPageController::class, 'index'])->name('landing');

    Route::prefix('auth')->group(function () {
        Route::controller(LoginController::class)->group(function () {
            Route::get('/login', 'login')->name('login');
            Route::post('login/store', 'store')->name('login.store');
        });

        Route::controller(SignupController::class)->group(function () {
            Route::get('/signup', 'signup')->name('signup');
            Route::post('signup/store', 'store')->name('signup.store');
        });

        Route::controller(LogoutController::class)->group(function () {
            Route::get('/logout', 'logout')->name('logout');
        });

    });

    Route::middleware('clientAuth')->group(function () {
        Route::prefix('inbox')->group(function () {
            Route::controller(MessageInboxController::class)->group(function () {
                Route::get('/messages', 'index')->name('inbox');
            });

            Route::controller(CreateConversationController::class)->group(function () {
                Route::post('/convo/store', 'store')->name('convo.store');
            });
        });
    });

});

Route::prefix('destinations')->group(function () {
    Route::get('/', [DestinationPageController::class, 'index'])->name('client.destination');
    Route::prefix('countries')->group(function () {
        Route::get('/', [DestinationPageController::class, 'countries'])->name('client.destination.countries');
        Route::get('/{slug}', [DestinationPageController::class, 'country'])->name('client.destination.country');
    });
});

// OUTBOUND DESTINATIONS
Route::prefix('outbound')->group(function () {
    Route::get('/', [OutboundPageController::class, 'index'])->name('client.outbound');

    Route::prefix('groups')->group(function () {
        Route::get('/{slug}', [OutboundPageController::class, 'groupDetail'])->name('client.outbound.group');
    });

    Route::prefix('packages')->group(function () {
        Route::get('/{slug}', [OutboundPageController::class, 'packageDetail'])->name('client.outbound.package.detail');
    });
});

// INBOUND DESTINATIONS
Route::prefix('inbound')->group(function () {
    Route::get('/', [InboundPageController::class, 'index'])->name('client.inbound');

    Route::prefix('groups')->group(function () {
        Route::get('/{slug}', [InboundPageController::class, 'groupDetail'])->name('client.inbound.group');
    });

    Route::prefix('packages')->group(function () {
        Route::get('/{slug}', [InboundPageController::class, 'packageDetail'])->name('client.inbound.package.detail');
    });
});

Route::prefix('inquiry')->group(function () {
    Route::post('/store', [InquiryResultController::class, 'store'])->name('client.inquiry.store')->middleware('throttle:5,10');
    Route::get('/success', [InquiryResultController::class, 'index'])->name('client.inquiry.success');
    Route::get('/policy', [InquiryPolicyController::class, 'index'])->name('client.inquiry.policy');
});

Route::get('/contacts', [ContactPageController::class, 'index'])->name('client.contact');
Route::get('/about', [AboutUsController::class, 'index'])->name('client.about');

// CHAT SESSIONS
Route::post('/chat/session', [
    ChatSessionController::class,
    'store',
])->name('chat.session.store');

Route::middleware('chat.session')->group(function () {

    Route::get(
        '/chat/session/{chatSession:uuid}',
        [ChatSessionController::class, 'show']
    )->name('chat.session.show');

    Route::post(
        '/chat/session/{chatSession:uuid}/validate',
        [ChatSessionController::class, 'validateSession']
    )->name('chat.session.validate');

    Route::get(
        '/chat/session/{chatSession:uuid}/messages',
        [ChatMessageController::class, 'getMessages']
    )->name('chat.session.messages');

    Route::post(
        '/chat/session/{chatSession:uuid}/messages/read',
        [ChatMessageController::class, 'markAsRead']
    )->name('chat.session.messages.read');

    Route::post(
        '/chat/session/{chatSession:uuid}/messages',
        [ChatMessageController::class, 'store']
    )->name('chat.session.message.store');

});

Route::fallback(function () {
    return Inertia::render('error/RouteFallbackError', [
        'code' => '404',
    ]);
});
