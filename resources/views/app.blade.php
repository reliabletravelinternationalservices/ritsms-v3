<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @if (! request()->is('admin*'))
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
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('storage/upload/agency/logo.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('storage/upload/agency/logo.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('storage/upload/agency/logo.png') }}">

        @routes
        @vite(['resources/js/app.ts'])

        <!-- Dynamic SEO rendered by Blade for Bots -->
        @php
            $seoData = $seo ?? [];
            $seoTitle = $seoData['title'] ?? 'Reliable International Travel Services';
            $seoDescription = $seoData['description'] ?? 'Reliable International Travel Services offers expertly curated inbound and outbound travel packages, destination guides, and personalized travel planning.';
            $seoImage = $seoData['image'] ?? asset('storage/upload/agency/logo.png');
            $seoUrl = $seoData['url'] ?? url()->current();
        @endphp

        <title>{{ $seoTitle }} - {{ config('app.name', 'Reliable International Travel Services') }}</title>
        <meta name="description" content="{{ Str::limit($seoDescription, 160) }}" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="author" content="Reliable International Travel Services" />
        <link rel="canonical" href="{{ $seoUrl }}" />

        <meta head-key="og:title" property="og:title" content="{{ Str::limit($seoTitle, 60) }}" />
        <meta head-key="og:description" property="og:description" content="{{ Str::limit($seoDescription, 160) }}" />
        <meta head-key="og:image" property="og:image" content="{{ $seoImage }}" />
        <meta head-key="og:url" property="og:url" content="{{ $seoUrl }}" />
        <meta head-key="og:type" property="og:type" content="website" />
        <meta head-key="og:site_name" property="og:site_name" content="Reliable International Travel Services" />

        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta head-key="twitter:title" name="twitter:title" content="{{ Str::limit($seoTitle, 60) }}" />
        <meta head-key="twitter:description" name="twitter:description" content="{{ Str::limit($seoDescription, 160) }}" />
        <meta head-key="twitter:image" name="twitter:image" content="{{ $seoImage }}" />

        @php
            $schemaJson = json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'TravelAgency',
                'name' => 'Reliable International Travel Services',
                'url' => $seoUrl,
                'description' => Str::limit($seoDescription, 160),
                'image' => $seoImage,
                'sameAs' => [
                    'https://www.facebook.com/reliableinternationaltravelservices',
                    'https://www.instagram.com/reliabletravelph/',
                    'https://www.tiktok.com/@reliabletravelph',
                    'https://www.youtube.com/@reliabletravelservices',
                ],
                'areaServed' => 'Philippines',
                'priceRange' => '$$',
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        @endphp

        <script type="application/ld+json">
            {!! $schemaJson !!}
        </script>

        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @if (!request()->is('admin*'))
            @include('partials.google-tag-manager-body')
        @endif
        @inertia
    </body>
</html>
