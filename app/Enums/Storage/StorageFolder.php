<?php

namespace App\Enums\Storage;

enum StorageFolder: string
{
    // Private files
    case CONVERSATIONS = 'conversations';
    case PASSPORTS = 'passports';
    case VISA_DOCUMENTS = 'visa-documents';
    case BOOKING_DOCUMENTS = 'booking-documents';

    // Public files
    case TOUR_PACKAGES = 'tour-packages';
    case DESTINATIONS = 'destinations';
    case BANNERS = 'banners';
    case FLYERS = 'flyers';
    case AVATARS = 'avatars';
    case BLOG = 'blog';
}
