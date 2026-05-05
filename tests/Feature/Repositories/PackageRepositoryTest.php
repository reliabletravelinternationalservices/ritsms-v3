<?php

use App\Models\Package;
use App\Repository\Package\PackageRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;

uses(RefreshDatabase::class);

test('package repository can create a package', function () {
    $repository = app(PackageRepository::class);
    
    $package = $repository->createPackage([
        'name' => 'Bohol Countryside Retreat',
        'tag' => 'Group Tour',
        'description' => 'A relaxing countryside escape in Bohol with river cruises, chocolate hills views, and local farm visits.',
        'base_price' => 28000.00,
        'down_payment' => 7000.00,
        'duration' => 4,
        'selling_start_date' => '2026-07-10',
        'selling_end_date' => '2026-10-10',
        'highlights' => 'River cruises|Chocolate hills views|Local farm visits',
        'itineraries' => json_encode([
            ['day' => 1, 'activity' => 'Arrival and session at Camp John Hay'],
            ['day' => 2, 'activity' => 'River cruises and chocolate hills views'],
            ['day' => 3, 'activity' => 'Local farm visits and city sightseeing'],
            ['day' => 4, 'activity' => 'Arrival and session at Camp John Hay']
        ]),
        'inclusions' => 'Accommodation, breakfast, transfers, tours|Local guide|Optional river cruises|Optional chocolate hills views|Optional local farm visits',
        'exclusions' => 'Airfare|Travel insurance|Personal expenses',
        'notes' => 'Bring a jacket|Reserve extra time for traffic',
        'destination' => 'Bohol',
        'season' => 'summer',
        'is_featured' => false,
    ]);

    expect($package)->toBeInstanceOf(Package::class);
    expect($package->name)->toBe('Bohol Countryside Retreat');
    expect(Package::count())->toBe(1);
});

test('package repository can create many packages', function () {
    $repository = app(PackageRepository::class);

    $packages = $repository->createManyPackage([
        [
            'name' => 'Cebu Coastal Adventure',
            'tag' => 'Family Tour',
            'description' => 'A beach and city experience around Cebu with heritage tours and water activities.',
            'base_price' => 36000.00,
            'down_payment' => 9000.00,
            'duration' => 5,
            'selling_start_date' => '2026-08-01',
            'selling_end_date' => '2026-11-30',
            'highlights' => 'Beach time|City sightseeing|Water activities',
            'itineraries' => json_encode([
                ['day' => 1, 'activity' => 'Arrival and session at Camp John Hay'],
                ['day' => 2, 'activity' => 'Beach time and city sightseeing'],
                ['day' => 3, 'activity' => 'Water activities and city sightseeing'],
                ['day' => 4, 'activity' => 'Beach time and city sightseeing'],
                ['day' => 5, 'activity' => 'Departure'],
            ]),
            'inclusions' => 'Accommodation, breakfast, transfers, tours|Local guide|Optional beach time|Optional city sightseeing|Optional water activities',
            'exclusions' => 'Airfare|Travel insurance|Personal expenses',
            'notes' => 'Bring sunscreen|Reserve extra time for traffic',
            'destination' => 'Cebu',
            'season' => 'summer',
            'is_featured' => true,
        ],
        [
            'name' => 'Baguio Mountain Getaway',
            'tag' => 'Couples Tour',
            'description' => 'A cool weather retreat in Baguio with garden walks, strawberry picking, and scenic viewpoints.',
            'base_price' => 29000.00,
            'down_payment' => 8000.00,
            'duration' => 4,
            'selling_start_date' => '2026-09-01',
            'selling_end_date' => '2026-12-31',
            'highlights' => 'Garden walks|Strawberry picking|Scenic viewpoints',
            'itineraries' => json_encode([
                ['day' => 1, 'activity' => 'Arrival and session at Camp John Hay'],
                ['day' => 2, 'activity' => 'Garden walks and strawberry picking'],
                ['day' => 3, 'activity' => 'Scenic viewpoints and city sightseeing'],
                ['day' => 4, 'activity' => 'Departure'],
            ]),
            'inclusions' => 'Accommodation, breakfast, transfers, tours|Local guide|Optional garden walks|Optional strawberry picking|Optional scenic viewpoints',
            'exclusions' => 'Airfare|Travel insurance|Personal expenses',
            'notes' => 'Bring sunscreen|Reserve extra time for traffic',
            'destination' => 'Baguio',
            'season' => 'autumn',
            'is_featured' => false,
        ],
    ]);

    expect($packages)->toBeInstanceOf(Collection::class);
    expect($packages)->toHaveCount(2);
    expect(Package::count())->toBe(2);
});
