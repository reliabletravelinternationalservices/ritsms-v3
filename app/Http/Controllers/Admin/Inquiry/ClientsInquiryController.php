<?php

namespace App\Http\Controllers\Admin\Inquiry;

use App\Http\Controllers\Controller;
use App\Repository\Inquiry\InquiryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientsInquiryController extends Controller
{
    public function __construct(protected InquiryRepository $repository){}
    public function index()
    {
        $inquiries = $this->repository->getAllInquiries();
        return Inertia::render('admin/inquiry/ClientsInquiry', compact('inquiries'));
    }
}
