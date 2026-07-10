<?php

namespace App\Services\Share;

use Illuminate\Support\Facades\View;

class PublicShare
{

    public static function SEO(string $title, string $description, string|null $image = null, string|null $url = null)
    {
        View::share('seo', [
            'title' =>  $title,
            'description' => $description,
            'image' => $image ?? asset('storage/upload/agency/logo.png'),
            'url' => $url ?? url()->current(),
        ]);
    }
}