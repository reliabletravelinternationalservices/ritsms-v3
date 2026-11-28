<?php

namespace App\Enums\Storage\Image;

enum ImageSize: string
{
    case THUMBNAIL = 'thumbnail';
    case SMALL = 'small';
    case MEDIUM = 'medium';
    case LARGE = 'large';

    public function dimensions(): array
    {
        return match ($this) {
            self::THUMBNAIL => [150, 150],
            self::SMALL => [320, 320],
            self::MEDIUM => [640, 640],
            self::LARGE => [1200, 1200],
        };
    }
}