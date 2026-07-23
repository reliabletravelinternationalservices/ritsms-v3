<?php

namespace App\Observers;

use App\Models\Destination;
use Illuminate\Support\Facades\Cache;

class DestinationObserver
{
    /**
     * Handle the Destination "created" event.
     */
    public function created(Destination $destination): void
    {
        Cache::forget('api:countries');

    }

    /**
     * Handle the Destination "updated" event.
     */
    public function updated(Destination $destination): void
    {
        Cache::forget('api:countries');
    }

    /**
     * Handle the Destination "deleted" event.
     */
    public function deleted(Destination $destination): void
    {
        Cache::forget('api:countries');
    }

    /**
     * Handle the Destination "restored" event.
     */
    public function restored(Destination $destination): void
    {
        Cache::forget('api:countries');
    }

    /**
     * Handle the Destination "force deleted" event.
     */
    public function forceDeleted(Destination $destination): void
    {
        Cache::forget('api:countries');
    }
}
