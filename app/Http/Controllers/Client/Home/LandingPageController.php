<?php

namespace App\Http\Controllers\Client\Home;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageRepository;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function __construct(protected PackageRepository $packageRepository, protected DestinationRepository $destinationRepository) {}

    public function index()
    {

        $inbound = $this->packageRepository->getFeaturedInboundPackages();
        $outbound = $this->packageRepository->getFeaturedOutboundPackages();
        $destinations = $this->destinationRepository->getAllDestinations();
        return Inertia::render('client/home/LandingPage', [
            'inbound' => $inbound,
            'outbound' => $outbound,
            'destinations' => $destinations
        ]);
    }
}
