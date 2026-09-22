<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use App\Services\Quotation\QuotationService;
use Inertia\Inertia;

class ViewQuotationController extends Controller
{
    public function __construct(
        protected QuotationService $quotationService
    ) {
    }

    public function view(string $slug)
    {
        $quotation = Quotation::with(['tour', 'client'])->where('slug', $slug)->firstOrFail();

        return Inertia::render(
            'admin/quotation/ViewQuotation',
            compact('quotation')
        );
    }
}