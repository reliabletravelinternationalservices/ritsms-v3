<?php

namespace App\Enums\Tour;

enum ItineraryType: string
{
    case ROUND_TRIP = 'round_trip';
    case MULTI_CITY = 'multi_city';
    case ONE_WAY = 'one_way';

    public function label(): string
    {
        return match ($this) {
            self::ROUND_TRIP => 'Round Trip',
            self::MULTI_CITY => 'Multi City',
            self::ONE_WAY => 'One Way',
        };
    }
}
