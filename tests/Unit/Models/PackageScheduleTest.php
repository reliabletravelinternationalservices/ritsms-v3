<?php

use App\Models\PackageSchedule;

test('package schedule model has correct fillable attributes', function () {
    $fillable = (new \ReflectionClass(PackageSchedule::class))->getProperty('fillable')->getValue(new PackageSchedule());

    expect($fillable)->toContain('package_id', 'departure_date', 'return_date', 'price', 'is_available', 'is_limited');
});

test('package schedule model has package relationship method', function () {
    $schedule = new PackageSchedule();

    expect(method_exists($schedule, 'package'))->toBeTrue();
});

test('package schedule model has no timestamps', function () {
    $timestamps = (new \ReflectionClass(PackageSchedule::class))->getProperty('timestamps')->getValue(new PackageSchedule());

    expect($timestamps)->toBeFalse();
});
