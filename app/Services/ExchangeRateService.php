<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ExchangeRateService
{
    public function fetchUsdToPhp(): ?float
    {
        $response = Http::get('https://api.frankfurter.dev/v1/latest', [
            'base' => 'USD',
            'symbols' => 'PHP',
        ]);

        return $response->json('rates.PHP');
    }
}