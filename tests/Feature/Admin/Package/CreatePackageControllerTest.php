<?php

use App\Models\Package;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package create page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $response = $this->get(route('admin.packages.create'));

    $response->assertStatus(200);
});

test('admin package store route saves a new package and redirects back', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $response = $this->post(route('admin.packages.store'), [
        'name' => 'New Package',
        'description' => 'New package description.',
        'highlights' => 'Highlight one',
        'itineraries' => "TITLE: Intro\nACTIVITY:\nSample activity",
        'inclusions' => 'Inclusion one',
        'exclusions' => 'Exclusion one',
        'notes' => 'Note one',
        'destination' => 'New Destination',
        'season' => 'Summer',
        'is_foreign_only' => false,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(10)->toDateString(),
        'base_price' => 100.00,
        'down_payment' => 20.00,
        'duration' => 3,
        'tag' => 'new',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('packages', ['name' => 'New Package']);
});
