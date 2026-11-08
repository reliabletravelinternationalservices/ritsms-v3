<?php


namespace App\Enums\User;

enum Role: string
{
    case ADMIN = 'admin';
    case AGENT = 'agent';
    case CLIENT = 'client';

    public function isAdmin(): bool
    {
        return $this->value === self::ADMIN->value;
    }

    public function isAgent(): bool
    {
        return $this->value === self::AGENT->value;
    }

    public function isClient(): bool
    {
        return $this->value === self::CLIENT->value;
    }
}
