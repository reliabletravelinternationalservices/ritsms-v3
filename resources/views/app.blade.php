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

        <title inertia>{{ config('app.name', 'Reliable International Travel Services') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <link rel="icon" type="image/x-icon" sizes="16x16" href="{{ asset('storage/upload/agency/rits_icon.ico') }}">
        <link rel="icon" type="image/x-icon" sizes="32x32" href="{{ asset('storage/upload/agency/rits_icon.ico') }}">
        <link rel="icon" type="image/x-icon" sizes="180x180" href="{{ asset('storage/upload/agency/rits_icon.ico') }}">

        @routes
        @vite(['resources/js/app.ts'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @if (!request()->is('admin*'))
            @include('partials.google-tag-manager-body')
        @endif
        @inertia
    </body>
</html>
