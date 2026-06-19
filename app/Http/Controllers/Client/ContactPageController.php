<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class ContactPageController extends Controller
{
    public function index()
    {
        View::share('seo', [
            'title' => 'Contact Us',
            'description' => "Contact us for any inquiries, bookings, or general information. We'd love to hear from you!",
            'image' => asset('storage/upload/agency/services.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/contact/ContactPage');
    }
}
