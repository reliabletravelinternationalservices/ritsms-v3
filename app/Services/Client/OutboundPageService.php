<?php

namespace App\Services\Client;

use App\Repository\Package\PackageGroupRepository;
use App\Services\Share\PublicShare;

class OutboundPageService
{
    public function __construct(
        protected PublicShare $share,
        protected PackageGroupRepository $repository
    ) {}

    public function getOutboundPageData()
    {
        $featuredGroupPackages = $this->repository->getPackageGroupByType('outbound', true);
        $groupPackages = $this->repository->getPackageGroupByType('outbound', false);

        $groups = [
            'featured' => $featuredGroupPackages->toArray(),
            'normal' => $groupPackages->toArray(),
        ];

        return compact('groups');
    }

    public function initializeRootPageSEO() {
        $this->share->SEO(
            'Outbound Travel Packages & International Destinations',
            'Discover exclusive outbound travel packages to top international destinations. Find adventure, culture, or relaxation with our trusted Philippine travel agency.',
            asset('storage/upload/agency/outbound_image.png'),
        );
    }
}