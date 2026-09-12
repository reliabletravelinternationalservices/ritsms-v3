<?php

namespace App\Services\Client;

use App\Services\Share\PublicShare;

class ContactPageService
{
    public function __construct(
        protected PublicShare $share
    ){}
    public function initializeRootPageSEO()
    {
        $this->share->SEO(
            'Contact Us',
            'Get in touch with Reliable International Travel Services for bookings, travel inquiries, or personalized trip planning. Our team in the Philippines is ready to help.',
            asset('storage/upload/agency/services.png')
        );
    }

}