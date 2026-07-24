<?php

namespace App\Services\Client;

use App\Models\Destination;
use App\Repository\Destination\DestinationRepository;
use App\Services\Share\PublicShare;

class DestinationPageService
{
    public function __construct(
        protected DestinationRepository $repository,
        protected PublicShare $share
        ) {}

    public function getAllDestinationData()
    {
        $destinations = $this->repository->getAllDestinations();
        return compact('destinations');
    }

    public function getDestinationBySlug(string $slug)
    {
        $destination =$this->repository->getDestinationBySlug($slug);
        return compact('destination');
    }

    public function initializeRootPageSEO()
    {
        $this->share->SEO(
            'Explore Most Popular Destinations Around The World',
            "Discover the world's most popular travel destinations, from stunning beaches to vibrant cities. Start planning your next unforgettable adventure today.",
            asset('storage/upload/agency/destination_image.png'),
        );
    }


    public function initializeCountriesPageSEO()
    {
        $this->share->SEO(
            'Countries & Travel Destinations We Serve',
            'Browse the full list of countries and destinations covered by our travel packages, tours, and ticketing services. We\'re continuously expanding to new destinations worldwide.',
            asset('storage/upload/agency/destination_image.png', config('assets.logo')),
        );
    }


    public function initializeDestinationPageSEO(Destination $destination)
    {
        $this->share->SEO(
            $destination->title,
            $destination->description,
            asset($destination->image->url?? config('assets.logo')),
        );
    }

}