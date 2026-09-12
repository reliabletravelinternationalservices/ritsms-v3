<?php

namespace App\Services\Client;

use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageRepository;
use App\Services\Share\PublicShare;

class LandingService
{
    public function __construct(
        protected PackageRepository $packageRepository, 
        protected DestinationRepository $destinationRepository, 
        protected PublicShare $share
        ) {}

    public function getData()
    {
        $inbound = $this->packageRepository->getFeaturedInboundPackages();
        $outbound = $this->packageRepository->getFeaturedOutboundPackages();
        $destinations = $this->destinationRepository->getAllDestinations();

        return [
            'inbound' => $inbound,
            'outbound' => $outbound,
            'destinations' => $destinations
        ];
    }

    public function initializeSEO()
    {
        $this->share->SEO(
            'Discover The World With Us',
            'Discover unforgettable travel experiences with Reliable International Travel Services. Explore our featured inbound and outbound packages, and find your perfect destination today!',
            config('assets.logo') ? asset(config('assets.logo')) : null,
        );
    }

}