<?php

namespace App\Enums\ConvoMessage;

// $table->enum('type', ['text', 'image', 'video', 'file', 'system'])->default('text');

enum Type: string
{
    case TEXT = 'text';
    case IMAGE = 'image';
    case VIDEO = 'video';
    case FILE = 'file';
    case SYSTEM = 'system';

    public static function getType(string $type): ?self
    {
        return self::tryFrom($type);
    }
}
