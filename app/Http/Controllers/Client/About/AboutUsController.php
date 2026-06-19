<?php

namespace App\Http\Controllers\Client\About;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class AboutUsController extends Controller
{
    public function index()
    {
        View::share('seo', [
            'title' => 'About Us',
            'description' => 'Learn more about our agency and services we provide. We are committed to providing you with the best travel experience possible.',
            'image' => asset('storage/upload/agency/about_agency.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/about/AboutUsPage');
    }
}
