<?php

namespace App\Http\Controllers\Client\Destination;

use App\Http\Controllers\Controller;
use App\Services\Client\DestinationPageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DestinationPageController extends Controller
{
    public function __construct(private DestinationPageService $service) {}
    public function index()
    {
        $this->service->initializeSEO();
        return Inertia::render('client/destination/DestinationPage', $this->service->getData());
    }
}
