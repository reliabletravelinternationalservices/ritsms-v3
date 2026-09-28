<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use App\Services\Quotation\QuotationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuotationManagementController extends Controller
{
    public function __construct(protected QuotationService $service) {
    }
    public function index(Request $request): Response
    {
        $filters = $request->only([
            'page',
            'per_page',
            'status',
            'search',
        ]);

        $quotations = $this->service->getQuotations(['client', 'tour'], $filters);
        return Inertia::render('admin/quotation/QuotationManagement', compact('quotations', 'filters'));
    }
}
