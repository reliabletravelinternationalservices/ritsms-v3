<?php

use App\Models\PackageGroup;

it('includes package group detail urls in the sitemap', function () {
    $outboundGroup = PackageGroup::create([
        'title' => 'Outbound Group',
        'description' => 'Outbound group description',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
    ]);

    $inboundGroup = PackageGroup::create([
        'title' => 'Inbound Group',
        'description' => 'Inbound group description',
        'include_as_outbound' => false,
        'include_as_inbound' => true,
    ]);

    $this->artisan('sitemap:generate')->assertSuccessful();

    $sitemap = file_get_contents(public_path('sitemap.xml'));

    expect($sitemap)
        ->toContain(route('client.outbound.group', ['slug' => $outboundGroup->slug]))
        ->toContain(route('client.inbound.group', ['slug' => $inboundGroup->slug]));
});
