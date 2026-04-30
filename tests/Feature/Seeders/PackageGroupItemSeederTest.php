<?php

use App\Models\Package;
use App\Models\PackageGroup;
use Database\Seeders\PackageGroupItemSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('package group item seeder attaches packages to package groups from json input', function () {
    PackageGroup::create([
        'title' => 'Group One',
        'description' => 'Inbound group one',
        'include_as_outbound' => false,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    PackageGroup::create([
        'title' => 'Group Two',
        'description' => 'Inbound group two',
        'include_as_outbound' => false,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    Package::create([
        'name' => 'Package A',
        'description' => 'First package',
        'base_price' => 10000.00,
        'down_payment' => 2000.00,
        'duration' => 3,
        'selling_start_date' => '2026-07-01',
        'highlights' => 'Highlight A',
        'itineraries' => [['day' => 1, 'activity' => 'Start']],
        'inclusions' => 'Inclusion A',
        'exclusions' => 'Exclusion A',
        'notes' => ['Note A'],
        'destination' => 'Destination A',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    Package::create([
        'name' => 'Package B',
        'description' => 'Second package',
        'base_price' => 12000.00,
        'down_payment' => 2500.00,
        'duration' => 4,
        'selling_start_date' => '2026-07-02',
        'highlights' => 'Highlight B',
        'itineraries' => [['day' => 1, 'activity' => 'Begin']],
        'inclusions' => 'Inclusion B',
        'exclusions' => 'Exclusion B',
        'notes' => ['Note B'],
        'destination' => 'Destination B',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    Package::create([
        'name' => 'Package C',
        'description' => 'Third package',
        'base_price' => 13000.00,
        'down_payment' => 3000.00,
        'duration' => 5,
        'selling_start_date' => '2026-07-03',
        'highlights' => 'Highlight C',
        'itineraries' => [['day' => 1, 'activity' => 'Continue']],
        'inclusions' => 'Inclusion C',
        'exclusions' => 'Exclusion C',
        'notes' => ['Note C'],
        'destination' => 'Destination C',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    Package::create([
        'name' => 'Package D',
        'description' => 'Fourth package',
        'base_price' => 14000.00,
        'down_payment' => 3500.00,
        'duration' => 6,
        'selling_start_date' => '2026-07-04',
        'highlights' => 'Highlight D',
        'itineraries' => [['day' => 1, 'activity' => 'Finish']],
        'inclusions' => 'Inclusion D',
        'exclusions' => 'Exclusion D',
        'notes' => ['Note D'],
        'destination' => 'Destination D',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    app(PackageGroupItemSeeder::class)->run();

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => 1,
        'package_id' => 1,
        'order_number' => 1,
    ]);

    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => 2,
        'package_id' => 3,
        'order_number' => 1,
    ]);
});
