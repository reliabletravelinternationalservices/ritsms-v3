<?php

namespace App\Http\Controllers\Client\Policy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryPolicyController extends Controller
{
    public function index()
    {
        return Inertia::render('client/policy/InquiryPolicy');
    }
}
