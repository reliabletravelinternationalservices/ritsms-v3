<?php

use App\Models\Package;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin packages index page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    Package::create([
        'name' => 'Index Package',
        'tag' => 'index',
        'description' => 'Index package description.',
        'base_price' => 180.00,
        'down_payment' => 25.00,
        'duration' => 8,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(12)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Intro', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Index Destination',
        'season' => 'Summer',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('admin.packages'));

    $response->assertStatus(200);
});
