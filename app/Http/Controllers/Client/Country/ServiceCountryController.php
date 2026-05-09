<?php

namespace App\Http\Controllers\Client\Country;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCountryController extends Controller
{
    public function index()
    {
        return Inertia::render('client/country/ServiceCountryPage');
    }
}
