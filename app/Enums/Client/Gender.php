<?php

namespace App\Enums\Client;

enum Gender: string
{
    case MALE = 'male';
    case FEMALE = 'female';
    case TRANSGENDER = 'transgender';
    case LESBIAN = 'lesbian';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::MALE => 'Male',
            self::FEMALE => 'Female',
            self::TRANSGENDER => 'Transgender',
            self::LESBIAN => 'Lesbian',
            self::OTHER => 'Other',
        };
    }
}