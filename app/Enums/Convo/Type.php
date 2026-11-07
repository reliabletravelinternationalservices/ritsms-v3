<?php

namespace App\Enums\Convo;

enum Type: string
{
    case GROUP = 'group';
    case PRIVATE = 'private';

    public static function getType(string $type): ?self
    {
        return self::tryFrom($type);
    }
}
