<?php

namespace App\Http\Controllers\Client\Message;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Inquiry\InquiryRequest;
use App\Repository\Inquiry\InquiryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $this->repository->createClientInquiry($validatedData);

        return redirect()->route('client.inquiry.success')->with('isInquired', true);
    }
}
