<?php

namespace App\Http\Controllers\Admin\Inquiry;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientsInquiryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/inquiry/ClientsInquiry');
    }
}
