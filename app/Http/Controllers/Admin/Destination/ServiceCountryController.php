<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCountryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/destination/ServiceCountry');
    }
}
