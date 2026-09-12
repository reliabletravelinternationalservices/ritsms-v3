<?php

namespace App\Http\Controllers\Client\Message;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Inquiry\InquiryRequest;
use App\Repository\Inquiry\InquiryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\Inquiry\InquiryMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class InquiryResultController extends Controller
{
    public function __construct(protected InquiryRepository $repository){}
    public function index()
    {
        if (!session('isInquired')) {
            return redirect()->route('client.landing');
        }
        return Inertia::render('client/message/InquiryResult');
    }


    public function store(InquiryRequest $request)
    {
        $validatedData = $request->validated();

        $inquiry = $this->repository->createClientInquiry($validatedData);

        $validatedData['inquiry_id'] = $inquiry->id;

        try {
            Mail::to('inquiry@reliabletravelph.com')
                ->send(new InquiryMail($validatedData));
        } catch (\Exception $e) {
            Log::error('Failed to send inquiry email.', [
                'message' => $e->getMessage(),
                'inquiry_id' => $inquiry->id,
            ]);
        }

        return redirect()
            ->route('client.inquiry.success')
            ->with('isInquired', true);
    }
}
