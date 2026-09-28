<?php

namespace App\Services\Quotation;

use App\Models\Quotation;
use App\Models\Quote;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class QuotationService
{
    /*
    |------------------------------------------------------------------------------------------
    | GET TOURS
    |------------------------------------------------------------------------------------------
    */

    public function getQuotations(
        array $relationships = [],
        array $filters = []
    ) {
        $perPage = $filters['per_page'] ?? 10;

        if (isset($filters['status']) && $filters['status'] === 'deleted') {
            return Quotation::with($relationships)
                ->whereNotNull('deleted_at')
                ->when(
                    isset($filters['search']) && $filters['search'] !== '',
                    function ($query) use ($filters) {
                        $search = $filters['search'];

                        $query->where(function ($query) use ($search) {
                            $query->orWhere('code', 'like', "%{$search}%");
                        });
                    }
                )
                ->withTrashed()
                ->paginate($perPage)
                ->withQueryString();
        }

        return Quotation::with($relationships)
            ->when(
                isset($filters['search']) && $filters['search'] !== '',
                function ($query) use ($filters) {
                    $search = $filters['search'];

                    $query->where(function ($query) use ($search) {
                        $query->orWhere('code', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                isset($filters['status']) && $filters['status'] !== 'all',
                fn ($query) => $query->where('status', $filters['status'])
            )
            ->paginate($perPage)
            ->withQueryString();
    }



}
