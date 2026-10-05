<?php

use App\Http\Middleware\Admin\AccountAccess;
use App\Http\Middleware\Admin\AuthAdmin;
use App\Http\Middleware\Admin\GuestUser;
use App\Http\Middleware\AuthClient;
use App\Http\Middleware\ChatSessionAuth;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',

        then: function () {
            Route::middleware(['web'])
                ->domain(config('app.admin_domain'))
                ->group(base_path('routes/admin.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'clientAuth' => AuthClient::class,
            'adminAuth' => AuthAdmin::class,
            'guestUser' => GuestUser::class,
            'accountAccess' => AccountAccess::class,
            'chat.session' => ChatSessionAuth::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
