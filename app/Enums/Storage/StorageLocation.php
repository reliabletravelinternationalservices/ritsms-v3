<?php

namespace App\Enums\Storage;

enum StorageLocation: string
{
    case PRIVATE = 'private';
    case PUBLIC = 'r2';

    public function disk(): string
    {
        return match ($this) {
            self::PRIVATE => 'private',
            self::PUBLIC => 'r2',
        };
    }
}
