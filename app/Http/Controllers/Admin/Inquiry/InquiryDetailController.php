<?php

namespace App\Http\Controllers\Admin\Inquiry;

use App\Http\Controllers\Controller;
use App\Repository\Inquiry\InquiryRepository;
use Illuminate\Http\Request;

class InquiryDetailController extends Controller
{
    public function __construct(protected InquiryRepository $repository){}
    public function index(int $id)
    {
        $inquiry = $this->repository->getInquiryById($id);

        return inertia('admin/inquiry/InquiryDetail', compact('inquiry'));
    }
}
