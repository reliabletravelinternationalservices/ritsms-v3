<?php

use App\Models\Package;

test('package detail page renders successfully', function () {
    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test package description',
        'base_price' => 100.00,
        'down_payment' => 10.00,
        'duration' => 2,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(10)->toDateString(),
        'highlights' => json_encode(['Highlight one']),
        'itineraries' => json_encode(['Day 1 itinerary']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode(['Note one']),
        'destination' => 'Test Destination',
        'season' => 'Summer',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('client.outbound.package.detail', ['slug' => $package->slug]));

    $response->assertStatus(200);
});
