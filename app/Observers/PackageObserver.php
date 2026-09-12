<?php

namespace App\Observers;

use App\Models\Package;
use Illuminate\Support\Facades\Cache;

class PackageObserver
{
    /**
     * Handle the Package "created" event.
     */
    public function created(Package $package): void
    {
        Cache::forget('api:packages');
    }

    /**
     * Handle the Package "updated" event.
     */
    public function updated(Package $package): void
    {
         Cache::forget('api:packages');
    }

    /**
     * Handle the Package "deleted" event.
     */
    public function deleted(Package $package): void
    {
         Cache::forget('api:packages');
    }

    /**
     * Handle the Package "restored" event.
     */
    public function restored(Package $package): void
    {
         Cache::forget('api:packages');
    }

    /**
     * Handle the Package "force deleted" event.
     */
    public function forceDeleted(Package $package): void
    {
         Cache::forget('api:packages');
    }
}
