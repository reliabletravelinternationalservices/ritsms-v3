<?php

namespace App\Services\Quote;

use App\Models\Quotation;
use App\Models\Quote;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class QuoteService
{
    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return Quotation::query()
            ->with(['client', 'guest'])
            ->latest()
            ->paginate($perPage);
    }

    public function getQuotation(float $total): float
    {
        return $total * 1.25;
    }
}
