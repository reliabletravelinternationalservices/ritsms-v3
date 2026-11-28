<?php
namespace App\Enums\Storage\Image;

enum ImageDirectory: string
{
    case ASSETS = 'assets';

    public function path(): string
    {
        return "images/{$this->value}";
    }
}