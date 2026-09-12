<?php

namespace App\Http\Controllers\Admin\Inquiry;

use App\Http\Controllers\Controller;
use App\Repository\Inquiry\InquiryRepository;
use Inertia\Inertia;

class InquiryDetailController extends Controller
{
    public function __construct(protected InquiryRepository $repository){}
    public function index(int $id)
    {
        $inquiry = $this->repository->getInquiryById($id);

        return Inertia::render('admin/inquiry/InquiryDetail', compact('inquiry'));
    }
}
