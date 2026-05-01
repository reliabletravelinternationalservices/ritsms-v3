<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageRepository;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function __construct(protected PackageRepository $packageRepository) {}

    public function index()
    {

        $inbound = $this->packageRepository->getFeaturedInboundPackages();
        $outbound = $this->packageRepository->getFeaturedOutboundPackages();

        return Inertia::render('client/home/LandingPage', compact('inbound', 'outbound'));
    }
}
