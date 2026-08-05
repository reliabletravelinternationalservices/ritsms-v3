<?php

namespace App\Cache;

use Closure;
use Illuminate\Support\Facades\Cache;

class CacheManager
{
    public function remember(
        string $key,
        int $ttl,
        Closure $callback
    ): mixed {
        return Cache::remember(
            $key,
            now()->addSeconds($ttl),
            $callback
        );
    }

    public function forget(string $key): void
    {
        Cache::forget($key);
    }

    public function put(
        string $key,
        mixed $value,
        int $ttl
    ): void {
        Cache::put(
            $key,
            $value,
            now()->addSeconds($ttl)
        );
    }

    public function get(string $key): mixed
    {
        return Cache::get($key);
    }

    public function flush(): void
    {
        Cache::flush();
    }
}
