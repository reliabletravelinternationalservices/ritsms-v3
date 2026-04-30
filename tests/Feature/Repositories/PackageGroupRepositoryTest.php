<?php

use App\Models\Package;
use App\Models\PackageGroup;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('package group repository adds group items to the correct package group', function () {
    $groupOne = PackageGroup::create([
        'title' => 'Inbound Highlights',
        'description' => 'Inbound package collection',
        'include_as_outbound' => false,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    $groupTwo = PackageGroup::create([
        'title' => 'Outbound Favorites',
        'description' => 'Outbound package collection',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => true,
    ]);

    $packageOne = Package::create([
        'name' => 'Sample Package One',
        'description' => 'Test package one.',
        'base_price' => 10000.00,
        'down_payment' => 2000.00,
        'duration' => 3,
        'selling_start_date' => '2026-07-01',
        'selling_end_date' => '2026-08-01',
        'highlights' => 'Test highlight one.',
        'itineraries' => [['day' => 1, 'activity' => 'Start']],
        'inclusions' => 'Test inclusion',
        'exclusions' => 'Test exclusion',
        'notes' => ['Note one'],
        'destination' => 'Test Destination',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    $packageTwo = Package::create([
        'name' => 'Sample Package Two',
        'description' => 'Test package two.',
        'base_price' => 12000.00,
        'down_payment' => 2500.00,
        'duration' => 4,
        'selling_start_date' => '2026-07-05',
        'selling_end_date' => '2026-08-05',
        'highlights' => 'Test highlight two.',
        'itineraries' => [['day' => 1, 'activity' => 'Begin']],
        'inclusions' => 'Test inclusion two',
        'exclusions' => 'Test exclusion two',
        'notes' => ['Note two'],
        'destination' => 'Another Destination',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    $repository = app(PackageGroupRepository::class);

    $repository->addGroupItem([
        'package_group_id' => $groupOne->id,
        'package_id' => $packageOne->id,
        'order_number' => 1,
    ]);

    $repository->addGroupItem([
        'package_group_id' => $groupTwo->id,
        'package_id' => $packageTwo->id,
        'order_number' => 1,
    ]);

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => $groupOne->id,
        'package_id' => $packageOne->id,
        'order_number' => 1,
    ]);

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => $groupTwo->id,
        'package_id' => $packageTwo->id,
        'order_number' => 1,
    ]);
});

test('package group repository add many group items saves each item to its own group', function () {
    $groupOne = PackageGroup::create([
        'title' => 'Inbound Collections',
        'description' => 'First group',
        'include_as_outbound' => false,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    $groupTwo = PackageGroup::create([
        'title' => 'Outbound Collections',
        'description' => 'Second group',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $packageOne = Package::create([
        'name' => 'Package One',
        'description' => 'First test package.',
        'base_price' => 9000.00,
        'down_payment' => 1500.00,
        'duration' => 2,
        'selling_start_date' => '2026-07-10',
        'selling_end_date' => '2026-08-10',
        'highlights' => 'Highlights one.',
        'itineraries' => [['day' => 1, 'activity' => 'One']],
        'inclusions' => 'Inclusions one',
        'exclusions' => 'Exclusions one',
        'notes' => ['Note one'],
        'destination' => 'Destination One',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    $packageTwo = Package::create([
        'name' => 'Package Two',
        'description' => 'Second test package.',
        'base_price' => 14000.00,
        'down_payment' => 3000.00,
        'duration' => 5,
        'selling_start_date' => '2026-09-01',
        'selling_end_date' => '2026-10-01',
        'highlights' => 'Highlights two.',
        'itineraries' => [['day' => 1, 'activity' => 'Two']],
        'inclusions' => 'Inclusions two',
        'exclusions' => 'Exclusions two',
        'notes' => ['Note two'],
        'destination' => 'Destination Two',
        'season' => 'autumn',
        'is_featured' => false,
    ]);

    $repository = app(PackageGroupRepository::class);

    $repository->addManyGroupItem([
        [
            'package_group_id' => $groupOne->id,
            'package_id' => $packageOne->id,
            'order_number' => 1,
        ],
        [
            'package_group_id' => $groupTwo->id,
            'package_id' => $packageTwo->id,
            'order_number' => 2,
        ],
    ]);

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => $groupOne->id,
        'package_id' => $packageOne->id,
        'order_number' => 1,
    ]);

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => $groupTwo->id,
        'package_id' => $packageTwo->id,
        'order_number' => 2,
    ]);
});
