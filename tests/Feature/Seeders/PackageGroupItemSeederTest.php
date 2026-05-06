<?php

use App\Models\Package;
use App\Models\PackageGroup;
use Database\Seeders\PackageGroupItemSeeder;
use Database\Seeders\PackageGroupSeeder;
use Database\Seeders\PackageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('package group item seeder attaches packages to package groups from json input', function () {
    // 1. Seed the dependencies first
    // This creates the Groups and Packages that the ItemSeeder needs
    $this->seed(PackageGroupSeeder::class);
    $this->seed(PackageSeeder::class);

    // 2. Run the seeder you are actually testing
    $this->seed(PackageGroupItemSeeder::class);

    // 3. Assertions
    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => 1,
        'package_id' => 1,
        'order_number' => 1,
    ]);
    
    // Check for one of the higher IDs that was failing before
    $this->assertDatabaseHas('package_groups_items', [
        'package_group_id' => 1,
        'package_id' => 5,
        'order_number' => 5,
    ]);
});