<?php

use App\Models\Package;

test('inbound package detail page renders successfully', function () {
    $package = Package::create([
        'name' => 'Inbound Package',
        'tag' => 'inbound',
        'description' => 'Inbound package description',
        'base_price' => 120.00,
        'down_payment' => 12.00,
        'duration' => 3,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(15)->toDateString(),
        'highlights' => json_encode(['Highlight one']),
        'itineraries' => json_encode(['Day 1 itinerary']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode(['Note one']),
        'destination' => 'Inbound Destination',
        'season' => 'Summer',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('client.inbound.package.detail', ['slug' => $package->slug]));

    $response->assertStatus(200);
});
