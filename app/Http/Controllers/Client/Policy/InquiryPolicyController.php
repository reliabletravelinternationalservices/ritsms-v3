<?php

namespace App\Http\Controllers\Client\Policy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class InquiryPolicyController extends Controller
{
    public function index()
    {
        View::share('seo', [
            'title' => 'Why We Ask for Your Information',
            'description' => 'Learn how we protect your personal data in compliance with the Philippine Data Privacy Act. See exactly why we collect your contact details and how they are used.',
            'image' => asset('storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/policy/InquiryPolicy');
    }
}
