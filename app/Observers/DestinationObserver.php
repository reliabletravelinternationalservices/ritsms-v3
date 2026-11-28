<?php

namespace App\Observers;

use App\Models\Destination;
use Illuminate\Support\Facades\Cache;

class DestinationObserver
{

    private function clearCache(): void
    {
        Cache::tags(['countries'])->flush();
    }
    /**
     * Handle the Destination "created" event.
     */
    public function created(Destination $destination): void
    {
       $this->clearCache();
    }

    /**
     * Handle the Destination "updated" event.
     */
    public function updated(Destination $destination): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Destination "deleted" event.
     */
    public function deleted(Destination $destination): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Destination "restored" event.
     */
    public function restored(Destination $destination): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Destination "force deleted" event.
     */
    public function forceDeleted(Destination $destination): void
    {
        $this->clearCache();
    }
}
