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
            'title' => 'Inquiry Policy',
            'description' => 'We keep our process transparent. Here is exactly why your details are necessary when you send us a message.',
            'image' => asset('storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/policy/InquiryPolicy');
    }
}
