<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DestinationPageController extends Controller
{
    public function index()
    {
        return Inertia::render('client/destination/DestinationPage');
    }
}
