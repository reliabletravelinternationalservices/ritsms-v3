<?php

namespace App\Services\Client;

use App\Models\Package;
use App\Models\PackageGroup;
use App\Repository\Destination\DestinationLocationRepository;
use App\Repository\Package\PackageGroupRepository;
use App\Repository\Package\PackageRepository;
use App\Services\Share\PublicShare;

class InboundPageService
{
    public function __construct(
        protected PublicShare $share,
        protected PackageGroupRepository $repository,
        protected DestinationLocationRepository $destRepo,
        protected PackageRepository $packageRepo
    ) {}


    // ROOT PAGE
    public function getInboundPageData()
    {
        $featuredGroupPackages = $this->repository->getPackageGroupByType('inbound', true);
        $groupPackages = $this->repository->getPackageGroupByType('inbound', false);
        $destinationLocations = $this->destRepo->getLocationsByCountryName('philippines');

        $locations = $destinationLocations->toArray();
        $featured = $featuredGroupPackages->toArray();
        $regular = $groupPackages->toArray();
        
        return compact('featured', 'regular', 'locations');
    }


    public function initializeRootPageSEO() {
        $this->share->SEO(
            'Explore Local Spots Here in The Philippines',
            'Discover the best local spots in the Philippines with our comprehensive guide. From stunning beaches to vibrant cities, explore hidden gems and popular destinations across the country. Plan your next adventure with us and experience the rich culture, breathtaking landscapes, and warm hospitality of the Philippines.',
            asset('storage/upload/agency/inbound_image.png'),
        );
    }




    // GROUP DETAILS PAGE
    public function getGroupDetailByID(int $id) {
        return $this->repository->getPackageGroupByID($id); 
    }

    public function geGroupPackagePageData(PackageGroup $group)
    {
        $isInbound = true;
        return compact('group', 'isInbound');
    }

    public function initializeGroupDetailPageSEO(PackageGroup $group) {
        $this->share->SEO(
            $group->title,
            $group->description,
            asset($group->primaryImage->url?? config('assets.logo')),
        );
    }


    // PACKAGE DETAILS PAGE
    public function getPackageBySlug(string $slug) {
        return $this->packageRepo->getPackageBySlug($slug);
        
    }

    public function getPackageDetailPageData(Package $package) {
        $isInbound = true;
        return compact('package', 'isInbound');
    }


    public function initializePackageDetailPageSEO(Package $package) {
        $this->share->SEO(
            $package->name,
            $package->description,
            asset($package->primaryImage->url?? config('assets.logo')),
        );
    }


}