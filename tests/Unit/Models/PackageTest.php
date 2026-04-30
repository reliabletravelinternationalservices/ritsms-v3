<?php

use App\Models\Package;

test('package model has correct fillable attributes', function () {
    $fillable = (new \ReflectionClass(Package::class))->getProperty('fillable')->getValue(new Package());

    expect($fillable)->toContain('name', 'tag', 'description', 'base_price', 'down_payment', 'duration', 'selling_start_date', 'selling_end_date', 'highlights', 'itineraries', 'inclusions', 'exclusions', 'notes', 'destination', 'season', 'is_featured');
});

test('package model casts itineraries and notes as arrays', function () {
    $casts = (new \ReflectionClass(Package::class))->getProperty('casts')->getValue(new Package());

    expect($casts)->toHaveKey('itineraries', 'array');
    expect($casts)->toHaveKey('notes', 'array');
});

test('package model has schedules relationship method', function () {
    $package = new Package();

    expect(method_exists($package, 'schedules'))->toBeTrue();
});
