<?php

namespace App\Http\Controllers\Client\Home;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageRepository;
use App\Services\Client\LandingService;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class LandingPageController extends Controller
{
    public function __construct(protected LandingService $service) {}


    public function index()
    {
        $this->service->initializeSEO();
        return Inertia::render('client/home/LandingPage', $this->service->getData());
    }
}
