<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuotationManagementController extends Controller
{
    public function index(): Response
    {
        $quotations = Quotation::latest()->paginate(10);
        $filters = [
            'search' => ''
        ];
        return Inertia::render('admin/quotation/QuotationManagement', compact('quotations', 'filters'));
    }
}
