<?php

use App\Models\Package;
use Database\Seeders\PackageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('package seeder creates packages', function () {
    $seeder = app(PackageSeeder::class);
    $seeder->run();

    expect(Package::count())->toBeGreaterThan(0);
});
