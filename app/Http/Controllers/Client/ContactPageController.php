<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Client\ContactPageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class ContactPageController extends Controller
{
    public function __construct(protected ContactPageService $service){}
    public function index()
    {
        $this->service->initializeRootPageSEO();
        return Inertia::render('client/contact/ContactPage');
    }
}
    