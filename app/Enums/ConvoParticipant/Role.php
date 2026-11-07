<?php


namespace App\Enums\ConvoParticipant;

enum Role: string
{
    case ADMIN = 'admin';
    case OWNER = 'owner';
    case MEMBER = 'member';
}
