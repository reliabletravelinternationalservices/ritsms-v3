<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationLocationRepository;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class InboundPageController extends Controller
{
    public function __construct(
        protected PackageGroupRepository $repository,
        protected DestinationLocationRepository $destinationLocationRepository
    ) {}

    public function index()
    {
        $featuredGroupPackages = $this->repository->getPackageGroupByType('inbound', true);
        $groupPackages = $this->repository->getPackageGroupByType('inbound', false);
        $destinationLocations = $this->destinationLocationRepository->getDistinctLocationNames();

        $groups = [
            'featured' => $featuredGroupPackages->toArray(),
            'normal' => $groupPackages->toArray(),
        ];

        View::share('seo', [
            'title' => 'Explore Local Spots Here in The Philippines',
            'description' => 'Discover the best local spots in the Philippines with our comprehensive guide. From stunning beaches to vibrant cities, explore hidden gems and popular destinations across the country. Plan your next adventure with us and experience the rich culture, breathtaking landscapes, and warm hospitality of the Philippines.',
            'image' => asset('storage/upload/agency/inbound_image.png'),
            'url' => url()->current(),
        ]);

        return Inertia::render('client/inbound/InboundPage', compact('groups', 'destinationLocations'));
    }
}
