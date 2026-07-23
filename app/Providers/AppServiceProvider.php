<?php

namespace App\Providers;

use App\Models\Destination;
use App\Models\Package;
use App\Observers\DestinationObserver;
use App\Observers\PackageObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->getLimit('packages');
        $this->getLimit('countries', 120);
        $this->getObserver();
    }



    private function getLimit(string $key, int $maxAttempts = 60)
    {
        RateLimiter::for($key, function (Request $request) use ($maxAttempts) {
            return Limit::perMinute($maxAttempts)
                ->by($request->ip());
        });

    }


    private function getObserver()
    {
        Destination::observe(DestinationObserver::class);
        Package::observe(PackageObserver::class);
    }
}
