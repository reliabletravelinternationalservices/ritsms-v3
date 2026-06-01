<?php

use App\Models\Package;
use App\Models\PackageSchedule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Create Tests
test('admin travel batch create page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('admin.packages.batches.create', ['id' => $package->id]));

    $response->assertStatus(200);
});

test('admin travel batch store route saves a new schedule and redirects', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $departureDate = now()->addDays(10)->toDateString();
    $returnDate = now()->addDays(15)->toDateString();

    $response = $this->post(route('admin.packages.batches.store', ['id' => $package->id]), [
        'departure_date' => $departureDate,
        'return_date' => $returnDate,
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $response->assertRedirect(route('admin.packages.details', ['id' => $package->id]));
    $this->assertDatabaseHas('package_schedules', [
        'package_id' => $package->id,
        'departure_date' => $departureDate,
        'return_date' => $returnDate,
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);
});

test('admin travel batch store validates required fields', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $response = $this->post(route('admin.packages.batches.store', ['id' => $package->id]), [
        'departure_date' => '',
        'return_date' => '',
        'price' => '',
    ]);

    $response->assertSessionHasErrors(['departure_date', 'price']);
});

test('admin travel batch store allows null return date', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $departureDate = now()->addDays(10)->toDateString();

    $response = $this->post(route('admin.packages.batches.store', ['id' => $package->id]), [
        'departure_date' => $departureDate,
        'return_date' => '',
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('package_schedules', [
        'package_id' => $package->id,
        'departure_date' => $departureDate,
        'return_date' => null,
        'price' => 500.00,
    ]);
});

// Edit Tests
test('admin travel batch edit page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $schedule = PackageSchedule::create([
        'package_id' => $package->id,
        'departure_date' => now()->addDays(10)->toDateString(),
        'return_date' => now()->addDays(15)->toDateString(),
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $response = $this->get(route('admin.packages.batches.edit', [
        'id' => $package->id,
        'scheduleId' => $schedule->id,
    ]));

    $response->assertStatus(200);
});

test('admin travel batch update route updates schedule and redirects', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $schedule = PackageSchedule::create([
        'package_id' => $package->id,
        'departure_date' => now()->addDays(10)->toDateString(),
        'return_date' => now()->addDays(15)->toDateString(),
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $newDepartureDate = now()->addDays(20)->toDateString();
    $newReturnDate = now()->addDays(25)->toDateString();

    $response = $this->put(route('admin.packages.batches.update', [
        'id' => $package->id,
        'scheduleId' => $schedule->id,
    ]), [
        'departure_date' => $newDepartureDate,
        'return_date' => $newReturnDate,
        'price' => 750.00,
        'is_available' => false,
        'is_limited' => true,
    ]);

    $response->assertRedirect(route('admin.packages.details', ['id' => $package->id]));
    $this->assertDatabaseHas('package_schedules', [
        'id' => $schedule->id,
        'package_id' => $package->id,
        'departure_date' => $newDepartureDate,
        'return_date' => $newReturnDate,
        'price' => 750.00,
        'is_available' => false,
        'is_limited' => true,
    ]);
});

test('admin travel batch update validates required fields', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $schedule = PackageSchedule::create([
        'package_id' => $package->id,
        'departure_date' => now()->addDays(10)->toDateString(),
        'return_date' => now()->addDays(15)->toDateString(),
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $response = $this->put(route('admin.packages.batches.update', [
        'id' => $package->id,
        'scheduleId' => $schedule->id,
    ]), [
        'departure_date' => '',
        'return_date' => '',
        'price' => '',
    ]);

    $response->assertSessionHasErrors(['departure_date', 'price']);
});

// Destroy Tests
test('admin travel batch destroy route deletes schedule and redirects', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $schedule = PackageSchedule::create([
        'package_id' => $package->id,
        'departure_date' => now()->addDays(10)->toDateString(),
        'return_date' => now()->addDays(15)->toDateString(),
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $response = $this->delete(route('admin.packages.batches.destroy', [
        'id' => $package->id,
        'scheduleId' => $schedule->id,
    ]));

    $response->assertRedirect(route('admin.packages.details', ['id' => $package->id]));
    $this->assertDatabaseMissing('package_schedules', ['id' => $schedule->id]);
});

test('admin travel batch destroy fails for non-existent schedule', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $response = $this->delete(route('admin.packages.batches.destroy', [
        'id' => $package->id,
        'scheduleId' => 9999,
    ]));

    $response->assertStatus(404);
});

test('admin travel batch store validates return date is after or equal to departure date', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description.',
        'base_price' => 150.00,
        'down_payment' => 30.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Day 1', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Test Destination',
        'season' => 'Spring',
        'is_foreign_only' => false,
    ]);

    $departureDate = now()->addDays(10)->toDateString();
    $returnDate = now()->addDays(5)->toDateString(); // Before departure

    $response = $this->post(route('admin.packages.batches.store', ['id' => $package->id]), [
        'departure_date' => $departureDate,
        'return_date' => $returnDate,
        'price' => 500.00,
        'is_available' => true,
        'is_limited' => false,
    ]);

    $response->assertSessionHasErrors(['return_date']);
});
