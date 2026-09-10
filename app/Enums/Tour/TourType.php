<?php

namespace App\Enums\Tour;

enum TourType: string
{
    case REGULAR = 'regular';
    case PRIVATE = 'private';
    case CUSTOM = 'custom';
    case GROUP = 'group';

    public function label(): string
    {
        return match ($this) {
            self::REGULAR => 'Regular Tour',
            self::PRIVATE => 'Private Tour',
            self::CUSTOM => 'Custom Tour',
            self::GROUP => 'Group Tour',
        };
    }
}
