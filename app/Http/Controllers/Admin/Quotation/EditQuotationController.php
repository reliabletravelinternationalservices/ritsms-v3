<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Quotation;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditQuotationController extends Controller
{
    public function edit(string $slug)
    {
        $quotation =  Quotation::where('slug', $slug)->get();
        $clients = Client::latest()->get();
        $tours = Tour::with(['departures'])->latest()->get();
        return Inertia::render('admin/quotation/EditQuotation', compact('quotation', 'clients', 'tours'));
    }
}
