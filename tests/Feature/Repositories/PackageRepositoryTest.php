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
        'highlights' => 'Loboc River cruise, chocolate hills viewpoint, tarsier sanctuary, island hopping.',
        'itineraries' => [
            ['day' => 1, 'activity' => 'Arrival and lunch at a riverside restaurant'],
            ['day' => 2, 'activity' => 'Chocolate Hills tour and tarsier sanctuary visit'],
            ['day' => 3, 'activity' => 'Island hopping and snorkeling in Pamilacan'],
            ['day' => 4, 'activity' => 'Departure after breakfast'],
        ],
        'inclusions' => 'Hotel accommodation, breakfast, transfers, guided tours.',
        'exclusions' => 'Airfare, travel insurance, personal expenses.',
        'notes' => ['Pack sunscreen', 'Bring insect repellent'],
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
            'highlights' => 'Cebu city tour, Oslob whale sharks, Moalboal snorkeling.',
            'itineraries' => [
                ['day' => 1, 'activity' => 'Arrival and city tour'],
                ['day' => 2, 'activity' => 'Oslob whale shark encounter'],
                ['day' => 3, 'activity' => 'Kawasan Falls canyoneering'],
                ['day' => 4, 'activity' => 'Moalboal snorkeling and beach time'],
                ['day' => 5, 'activity' => 'Departure'],
            ],
            'inclusions' => 'Accommodation, transfers, tours, breakfast.',
            'exclusions' => 'Airfare, insurance, optional meals.',
            'notes' => ['Wear water shoes', 'Bring waterproof phone case'],
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
            'highlights' => 'Strawberry farm visit, Burnham Park boat ride, Mines View Park.',
            'itineraries' => [
                ['day' => 1, 'activity' => 'Arrival and session at Camp John Hay'],
                ['day' => 2, 'activity' => 'Strawberry picking and garden tours'],
                ['day' => 3, 'activity' => 'City sightseeing and local market shopping'],
                ['day' => 4, 'activity' => 'Departure'],
            ],
            'inclusions' => 'Hotel stays, breakfast, transfers, tours.',
            'exclusions' => 'Airfare, insurance, personal expenses.',
            'notes' => ['Bring a jacket', 'Reserve extra time for traffic'],
            'destination' => 'Baguio',
            'season' => 'autumn',
            'is_featured' => false,
        ],
    ]);

    expect($packages)->toBeInstanceOf(Collection::class);
    expect($packages)->toHaveCount(2);
    expect(Package::count())->toBe(2);
});
