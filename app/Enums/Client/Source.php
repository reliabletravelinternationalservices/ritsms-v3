<?php

namespace App\Enums\Client;

enum Source: string
{
    case WEBSITE = 'website';
    case MANUAL = 'manual';
    case GMAIL = 'gmail';
    case WALK_IN = 'walk_in';
    case GOOGLE_ADS = 'google_ads';
    case FACEBOOK = 'facebook';
    case INSTAGRAM = 'instagram';
    case TIKTOK = 'tiktok';
    case YOUTUBE = 'youtube';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::WEBSITE => 'Website',
            self::MANUAL => 'Manual',
            self::GMAIL => 'Gmail',
            self::WALK_IN => 'Walk In',
            self::GOOGLE_ADS => 'Google Ads',
            self::FACEBOOK => 'Facebook',
            self::INSTAGRAM => 'Instagram',
            self::TIKTOK => 'TikTok',
            self::YOUTUBE => 'YouTube',
            self::OTHER => 'Other',
        };
    }
}