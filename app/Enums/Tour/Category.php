<?php


namespace App\Enums\Tour;

enum Category: string
{
    case DOMESTIC = 'domestic';
    case INBOUND = 'inbound';
    case OUTBOUND = 'outbound';

    public function label(): string
    {
        return match ($this) {
            self::DOMESTIC => 'Domestic',
            self::INBOUND => 'Inbound',
            self::OUTBOUND => 'Outbound',
        };
    }
}
