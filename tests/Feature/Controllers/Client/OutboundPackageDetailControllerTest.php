<?php

use App\Models\Package;

test('outbound package detail page renders successfully', function () {
    $package = Package::create([
        'name' => 'Outbound Package',
        'tag' => 'outbound',
        'description' => 'Outbound package description',
        'base_price' => 140.00,
        'down_payment' => 14.00,
        'duration' => 4,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(20)->toDateString(),
        'highlights' => json_encode(['Highlight one']),
        'itineraries' => json_encode(['Day 1 itinerary']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode(['Note one']),
        'destination' => 'Outbound Destination',
        'season' => 'Summer',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('client.outbound.package.detail', ['slug' => $package->slug]));

    $response->assertStatus(200);
});
