<?php


namespace App\Enums\Conversation;

enum MessageType: string
{
    case TEXT = 'text';
    case IMAGE = 'image';
    case FILE = 'file';
    case SYSTEM = 'system';
}
