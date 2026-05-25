<?php

use App\Models\Package;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package details page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Detail Package',
        'tag' => 'detail',
        'description' => 'Detail package description.',
        'base_price' => 140.00,
        'down_payment' => 15.00,
        'duration' => 6,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(7)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Intro', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Detail Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('admin.packages.details', ['id' => $package->id]));

    $response->assertStatus(200);
});
