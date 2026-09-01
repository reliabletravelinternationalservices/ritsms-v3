<?php


namespace App\Enums\Image;

enum Collection: string
{
    case GALLERY = 'gallery';
    case THUMBNAIL = 'thumbnail';
    case VIDEO = 'video';
    case BANNER = 'banner';
    case ITINERARY = 'itinerary';
    case FLYER = 'flyer';

    public function label(): string
    {
        return match ($this) {
            self::GALLERY => 'Gallery',
            self::THUMBNAIL => 'Thumbnail',
            self::VIDEO => 'Video',
            self::BANNER => 'Banner',
            self::ITINERARY => 'Itinerary',
            self::FLYER => 'Flyer',
        };
    }
}
