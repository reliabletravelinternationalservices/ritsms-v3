<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Enums\Quotation\Status;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Quotation\QuotationRequest;
use App\Models\Client;
use App\Models\Quotation;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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


    public function status(Request $request, Quotation $quotation)
    {
        $validated = $request->validate([
            'status' => [
                'required',
                Rule::enum(Status::class),
            ],
        ]);

        $status = Status::from($validated['status']);

        $data = [
            'status' => $status->value,
        ];

        switch ($status) {
            case Status::DRAFT:
                $data += [
                    'sent_at' => null,
                    'viewed_at' => null,
                    'accepted_at' => null,
                ];
                break;

            case Status::SENT:
                $data += [
                    'sent_at' => now(),
                    'viewed_at' => null,
                    'accepted_at' => null,
                ];
                break;

            case Status::VIEWED:
                $data += [
                    'sent_at' => $quotation->sent_at ?? now(),
                    'viewed_at' => now(),
                    'accepted_at' => null,
                ];
                break;

            case Status::ACCEPTED:
                $data += [
                    'sent_at' => $quotation->sent_at ?? now(),
                    'viewed_at' => $quotation->viewed_at ?? now(),
                    'accepted_at' => now(),
                ];
                break;

            case Status::REJECTED:
            case Status::EXPIRED:
            case Status::CANCELLED:
                $data += [
                    'sent_at' => $quotation->sent_at,
                    'viewed_at' => $quotation->viewed_at,
                    'accepted_at' => null,
                ];
                break;
        }

        $quotation->update($data);

        return redirect()->back();
    }
}
