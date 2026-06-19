<?php

namespace App\Http\Controllers\Client\Home;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageRepository;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class LandingPageController extends Controller
{
    public function __construct(protected PackageRepository $packageRepository, protected DestinationRepository $destinationRepository) {}

    public function index()
    {

        $inbound = $this->packageRepository->getFeaturedInboundPackages();
        $outbound = $this->packageRepository->getFeaturedOutboundPackages();
        $destinations = $this->destinationRepository->getAllDestinations();

        View::share('seo', [
            'title' => 'Discover The World With Us',
            'description' => 'Discover unforgettable travel experiences with Reliable International Travel Services. Explore our featured inbound and outbound packages, and find your perfect destination today!',
            'image' => asset('storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);

        return Inertia::render('client/home/LandingPage', [
            'inbound' => $inbound,
            'outbound' => $outbound,
            'destinations' => $destinations
        ]);
    }
}
