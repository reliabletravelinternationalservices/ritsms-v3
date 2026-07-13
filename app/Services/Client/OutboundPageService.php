<?php

namespace App\Services\Client;

use App\Models\Package;
use App\Models\PackageGroup;
use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageGroupRepository;
use App\Services\Share\PublicShare;

class OutboundPageService
{
    public function __construct(
        protected PublicShare $share,
        protected PackageGroupRepository $repository,
        protected DestinationRepository $destRepo
    ) {}


    public function getGroupDetailByID(int $id) {
        $group = $this->repository->getPackageGroupByID($id);
        $group->load(['image', 'packages.primaryImage']);
        return $group;
    }

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


    public function geGroupPackagePageData(PackageGroup $group)
    {
        $isInbound = false;
        return compact('group', 'isInbound');
    }

    public function initializeRootPageSEO() {
        $this->share->SEO(
            'Outbound Travel Packages & International Destinations',
            'Discover exclusive outbound travel packages to top international destinations. Find adventure, culture, or relaxation with our trusted Philippine travel agency.',
            asset('storage/upload/agency/outbound_image.png')
        );
    }
    public function initializeGroupDetailPageSEO(PackageGroup $group) {
        $this->share->SEO(
            $group->title,
            $group->description,
            asset($group->primaryImage->url?? config('assets.logo')),
        );
    }
}