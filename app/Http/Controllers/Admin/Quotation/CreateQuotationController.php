<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Quotation\QuotationRequest;
use App\Models\Client;
use App\Models\Quotation;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CreateQuotationController extends Controller
{

    public function create()
    {
        $clients = Client::latest()->get();
        $tours = Tour::with(['departures'])->latest()->get();
        return Inertia::render('admin/quotation/CreateQuotation', compact('clients', 'tours'));
    }


    public function store(QuotationRequest $request)
    {
        $validatedData = $request->validated();
        DB::transaction(function() use ($validatedData){
            Quotation::create($validatedData);
        });
    }
}
