<?php

namespace App\Http\Controllers\Client\About;

use App\Http\Controllers\Controller;
use App\Services\Client\AboutUsPageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function __construct(protected AboutUsPageService $service){}
    public function index()
    {
        $this->service->initializeRootPageSEO();
        return Inertia::render('client/about/AboutUsPage');
    }
}
