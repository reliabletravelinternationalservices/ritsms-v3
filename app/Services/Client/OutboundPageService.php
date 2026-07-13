<?php

namespace App\Services\Client;

use App\Models\Package;
use App\Models\PackageGroup;
use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageGroupRepository;
use App\Repository\Package\PackageRepository;
use App\Services\Share\PublicShare;

class OutboundPageService
{
    public function __construct(
        protected PublicShare $share,
        protected PackageGroupRepository $repository,
        protected DestinationRepository $destRepo,
        protected PackageRepository $packageRepo
    ) {}


    // ROOT PAGE
    public function getOutboundPageData()
    {
        $destinationCountries = $this->destRepo->getDestinctCountries();
        $featuredGroupPackages = $this->repository->getPackageGroupByType('outbound', true);
        $groupPackages = $this->repository->getPackageGroupByType('outbound', false);

        $countries = $destinationCountries->toArray();
        $featured = $featuredGroupPackages->toArray();
        $regular = $groupPackages->toArray();
        
        return compact('featured', 'regular', 'countries');
    }


    public function initializeRootPageSEO() {
        $this->share->SEO(
            'Outbound Travel Packages & International Destinations',
            'Discover exclusive outbound travel packages to top international destinations. Find adventure, culture, or relaxation with our trusted Philippine travel agency.',
            asset('storage/upload/agency/outbound_image.png')
        );
    }



    // PACKAGE GROUP DETAILS PAGE
    public function getGroupDetailByID(int $id) {
        return $this->repository->getPackageGroupByID($id); 
    }

    public function geGroupPackagePageData(PackageGroup $group)
    {
        $isInbound = false;
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
        $isInbound = false;
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