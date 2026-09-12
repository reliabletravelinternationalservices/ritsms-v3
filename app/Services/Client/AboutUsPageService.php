<?php

namespace App\Services\Client;

use App\Services\Share\PublicShare;

class AboutUsPageService
{
    public function __construct(
        protected PublicShare $share
    ){}
    public function initializeRootPageSEO()
    {
        $this->share->SEO(
            'About Us',
            'Founded in 2009, our Philippine travel agency has 17+ years of experience delivering trusted, personalized travel planning worldwide.',
            asset('storage/upload/agency/about_agency.png'),
        );
    }
}