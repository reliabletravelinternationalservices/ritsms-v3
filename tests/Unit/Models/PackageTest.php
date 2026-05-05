<?php

use App\Models\Package;

test('package model has correct fillable attributes', function () {
    $fillable = (new \ReflectionClass(Package::class))->getProperty('fillable')->getValue(new Package());

    expect($fillable)->toContain('name', 'tag', 'description', 'base_price', 'down_payment', 'duration', 'selling_start_date', 'selling_end_date', 'highlights', 'itineraries', 'inclusions', 'exclusions', 'notes', 'destination', 'season', 'is_foreign_only');
});

test('package model provides array versions of itineraries and notes', function () {
    $package = new \App\Models\Package([
        'notes' => 'Note 1|Note 2',
        'itineraries' => json_encode([['day' => 1, 'activity' => ['Arrival']]])
    ]);

    // Check the Accessors (Appends)
    expect($package->notes_array)->toBeArray()
        ->and($package->notes_array)->toHaveCount(2)
        ->and($package->notes_array[0])->toBe('Note 1');

    expect($package->itineraries_array)->toBeArray()
        ->and($package->itineraries_array[0]['day'])->toBe(1);
});

test('package model has correct appends configured', function () {
    $package = new \App\Models\Package();
    expect($package->getAppends())->toContain('itineraries_array', 'notes_array');
});

test('package model has schedules relationship method', function () {
    $package = new Package();

    expect(method_exists($package, 'schedules'))->toBeTrue();
});
