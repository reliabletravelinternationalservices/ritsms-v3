<?php

use App\Models\Package;
use App\Models\PackageGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package group pin page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Pin Page Group',
        'description' => 'Pin page render test description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    Package::create([
        'name' => 'Pinned Package',
        'tag' => 'test',
        'description' => 'Test description',
        'base_price' => 100.00,
        'down_payment' => 10.00,
        'duration' => 1,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['highlight one']),
        'itineraries' => json_encode(['itinerary one']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode([]),
        'destination' => 'Test destination',
        'season' => 'All Year',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('admin.packages.groups.pin', ['id' => $group->id]));
    $response->assertStatus(200);
});

test('admin can update pinned package order for a group', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Pin Update Group',
        'description' => 'Pin update test description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $packageOne = Package::create([
        'name' => 'Package One',
        'tag' => 'one',
        'description' => 'Package one description.',
        'base_price' => 100.00,
        'down_payment' => 10.00,
        'duration' => 2,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(14)->toDateString(),
        'highlights' => json_encode(['highlight one']),
        'itineraries' => json_encode(['itinerary one']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode([]),
        'destination' => 'Destination A',
        'season' => 'All Year',
        'is_foreign_only' => false,
    ]);

    $packageTwo = Package::create([
        'name' => 'Package Two',
        'tag' => 'two',
        'description' => 'Package two description.',
        'base_price' => 120.00,
        'down_payment' => 15.00,
        'duration' => 3,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(14)->toDateString(),
        'highlights' => json_encode(['highlight two']),
        'itineraries' => json_encode(['itinerary two']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode([]),
        'destination' => 'Destination B',
        'season' => 'All Year',
        'is_foreign_only' => false,
    ]);

    $response = $this->put(route('admin.packages.groups.pin.update', ['id' => $group->id]), [
        'pinned_package_ids' => [
            ['package_id' => $packageOne->id, 'order_number' => 2],
            ['package_id' => $packageTwo->id, 'order_number' => 1],
        ],
    ]);

    $response->assertRedirect(route('admin.packages.groups.pin', ['id' => $group->id]));

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => $group->id,
        'package_id' => $packageOne->id,
        'order_number' => 2,
    ]);

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => $group->id,
        'package_id' => $packageTwo->id,
        'order_number' => 1,
    ]);
});
