<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
                
        @if (!request()->is('admin*'))
            @include('partials.google-tag-manager-head')    
            @include('partials.adsense')
            @include('partials.google-ads')
        @endif
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <link rel="icon" type="image/x-icon" sizes="16x16" href="{{ asset('storage/upload/agency/rits_icon.ico') }}">
        <link rel="icon" type="image/x-icon" sizes="32x32" href="{{ asset('storage/upload/agency/rits_icon.ico') }}">
        <link rel="icon" type="image/x-icon" sizes="180x180" href="{{ asset('storage/upload/agency/rits_icon.ico') }}">

        @routes
        @vite(['resources/js/app.ts'])

        <!-- Dynamic SEO rendered by Blade for Bots -->
        @isset($seo)
            <title>{{ $seo['title'] }} - {{ config('app.name', 'Reliable International Travel Services') }}</title>

            <meta head-key="og:title" property="og:title" content="{{ Str::limit($seo['title'], 60) }}" />
            <meta head-key="og:description" property="og:description" content="{{ $seo['description'] }}" />
            <meta head-key="og:image" property="og:image" content="{{ $seo['image'] }}" />
            <meta head-key="og:url" property="og:url" content="{{ $seo['url'] }}" />
            <meta head-key="og:type" property="og:type" content="website" />

            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content="{{ Str::limit($seo['title'], 60) }}" />
            <meta head-key="twitter:description" name="twitter:description" content="{{ $seo['description'] }}" />
            <meta head-key="twitter:image" name="twitter:image" content="{{ $seo['image'] }}" />
        @endisset

        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @if (!request()->is('admin*'))
            @include('partials.google-tag-manager-body')
        @endif
        @inertia
    </body>
</html>
