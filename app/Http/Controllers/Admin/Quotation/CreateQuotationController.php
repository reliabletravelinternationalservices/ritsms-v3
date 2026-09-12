<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateQuotationController extends Controller
{
    public function create()
    {
        $clients = Client::latest()->get();
        $tours = Tour::with(['departures'])->latest()->get();
        return Inertia::render('admin/quotation/CreateQuotation', compact('clients', 'tours'));
    }
}
