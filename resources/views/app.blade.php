
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
    <link
        href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
        rel="stylesheet"
    >

    <link rel="icon" href="{{ asset('storage/assets/icons/rits_icon.ico') }}">

    @routes
    @vite(['resources/js/app.ts'])

    @php
        $seoData = $seo ?? [];

        $seoTitle = $seoData['title']
            ?? 'Reliable International Travel Services';

        $seoDescription = $seoData['description']
            ?? 'Reliable International Travel Services offers expertly curated inbound and outbound travel packages, destination guides, and personalized travel planning.';

        $seoImage = $seoData['image']
            ?? asset('storage/upload/agency/logo.png');

        $seoUrl = $seoData['url']
            ?? url()->current();
    @endphp

    <title>{{ $seoTitle }} - {{ config('app.name') }}</title>

    <meta name="description" content="{{ Str::limit($seoDescription, 160) }}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <meta name="author" content="Reliable International Travel Services">

    <link rel="canonical" href="{{ $seoUrl }}">

    <meta property="og:title" content="{{ Str::limit($seoTitle, 60) }}">
    <meta property="og:description" content="{{ Str::limit($seoDescription, 160) }}">
    <meta property="og:image" content="{{ $seoImage }}">
    <meta property="og:url" content="{{ $seoUrl }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Reliable International Travel Services">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ Str::limit($seoTitle, 60) }}">
    <meta name="twitter:description" content="{{ Str::limit($seoDescription, 160) }}">
    <meta name="twitter:image" content="{{ $seoImage }}">

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
