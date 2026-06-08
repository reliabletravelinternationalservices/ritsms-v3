<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationLocationRepository;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
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

        return Inertia::render('client/inbound/InboundPage', compact('groups', 'destinationLocations'));
    }
}
