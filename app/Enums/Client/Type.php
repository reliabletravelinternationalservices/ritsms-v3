<?php

namespace App\Enums\Client;

enum Type: string
{
    case PERSONAL = 'personal';
    case BUSINESS = 'business';
    case PARTNER = 'partner';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::PERSONAL => 'Personal',
            self::BUSINESS => 'Business',
            self::PARTNER => 'Partner',
            self::OTHER => 'Other',
        };
    }
}