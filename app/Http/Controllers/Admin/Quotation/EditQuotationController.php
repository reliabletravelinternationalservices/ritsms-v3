<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Quotation\QuotationRequest;
use App\Models\Client;
use App\Models\Quotation;
use App\Models\Tour;
use Inertia\Inertia;

class EditQuotationController extends Controller
{
    public function edit(string $slug)
    {
        $quotation = Quotation::where('slug', $slug)->firstOrFail();
        $clients = Client::latest()->get();
        $tours = Tour::with(['departures'])->latest()->get();

        return Inertia::render('admin/quotation/EditQuotation', compact('quotation', 'clients', 'tours'));
    }

    public function update(QuotationRequest $request, Quotation $quotation)
    {
        $validatedData = $request->validated();
        $quotation->update($validatedData);

        return to_route('admin.quotations.edit', ['slug' => $quotation->slug]);
    }
}
