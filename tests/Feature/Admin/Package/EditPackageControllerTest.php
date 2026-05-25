<?php

use App\Models\Package;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package edit page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Edit Package',
        'tag' => 'edit',
        'description' => 'Package description.',
        'base_price' => 150.00,
        'down_payment' => 20.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(10)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Intro', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Edit Destination',
        'season' => 'Winter',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('admin.packages.edit', ['id' => $package->id]));

    $response->assertStatus(200);
});

test('admin package update route updates the package and redirects to details page', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Old Package',
        'tag' => 'old',
        'description' => 'Old description.',
        'base_price' => 150.00,
        'down_payment' => 20.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(10)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Intro', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Old Destination',
        'season' => 'Winter',
        'is_foreign_only' => false,
    ]);

    $response = $this->put(route('admin.packages.update', ['id' => $package->id]), [
        'name' => 'Updated Package',
        'description' => 'Updated description.',
        'highlights' => 'Highlight one',
        'itineraries' => "TITLE: Updated\nACTIVITY:\nUpdated activity",
        'inclusions' => 'Updated inclusion',
        'exclusions' => 'Updated exclusion',
        'notes' => 'Updated note',
        'destination' => 'Updated Destination',
        'season' => 'Spring',
        'is_foreign_only' => true,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(15)->toDateString(),
        'base_price' => 200.00,
        'down_payment' => 30.00,
        'duration' => 7,
        'tag' => 'updated',
    ]);

    $response->assertRedirect(route('admin.packages.details', ['id' => $package->id]));
    $this->assertDatabaseHas('packages', ['id' => $package->id, 'name' => 'Updated Package', 'description' => 'Updated description.']);
});
