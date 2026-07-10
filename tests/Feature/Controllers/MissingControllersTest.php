<?php

use App\Http\Controllers\Client\OutboundPackageDetailController;
use App\Models\Destination;
use App\Models\Package;
use App\Models\PackageGroup;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response as InertiaResponse;

beforeEach(function () {
    $this->actingAs(User::factory()->create([
        'display_name' => 'Test User',
    ]));
});

test('outbound page route renders successfully', function () {
    $response = $this->get(route('client.outbound'));

    $response->assertStatus(200);
});

test('inbound page route renders successfully', function () {
    $response = $this->get(route('client.inbound'));

    $response->assertStatus(200);
});

test('service country route renders successfully', function () {
    Destination::create([
        'title' => 'Test Country',
        'description' => 'Country description',
        'country' => 'Testland',
        'tag' => 'country',
    ]);

    $response = $this->get(route('client.destination.countries'));

    $response->assertStatus(200);
});

test('location route renders successfully', function () {
    $destination = Destination::create([
        'title' => 'Test Destination',
        'description' => 'Location description',
        'country' => 'Test Country',
        'tag' => 'test',
    ]);

    $response = $this->get(route('client.destination.country', ['destination' => $destination->id]));

    $response->assertStatus(200);
});

test('outbound and inbound package group routes render successfully', function () {
    $group = PackageGroup::create([
        'title' => 'Test Group',
        'description' => 'Group description',
        'include_as_outbound' => true,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    $outboundResponse = $this->get(route('client.outbound.package.group', ['id' => $group->id]));
    $inboundResponse = $this->get(route('client.inbound.package.group', ['id' => $group->id]));

    $outboundResponse->assertStatus(200);
    $inboundResponse->assertStatus(200);
});

test('outbound and inbound package detail routes render successfully', function () {
    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Package description',
        'base_price' => 100.00,
        'down_payment' => 10.00,
        'duration' => 1,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(10)->toDateString(),
        'highlights' => json_encode(['Highlight one']),
        'itineraries' => json_encode(['Day 1 itinerary']),
        'inclusions' => json_encode(['Inclusions text']),
        'exclusions' => json_encode(['Exclusions text']),
        'notes' => json_encode(['Note one']),
        'destination' => 'Test Destination',
        'season' => 'Test Season',
        'is_foreign_only' => false,
    ]);

    $outboundResponse = $this->get(route('client.outbound.package.detail', ['slug' => $package->slug]));
    $inboundResponse = $this->get(route('client.inbound.package.detail', ['slug' => $package->slug]));

    $outboundResponse->assertStatus(200);
    $inboundResponse->assertStatus(200);
});

test('unused outbound package detail controller can render directly', function () {
    $controller = new OutboundPackageDetailController;
    $response = $controller->index();

    expect($response)->toBeInstanceOf(InertiaResponse::class);
});

test('admin package routes render successfully', function () {
    $response = $this->get(route('admin.packages'));
    $response->assertStatus(200);

    $response = $this->get(route('admin.packages.groups'));
    $response->assertStatus(200);

    $response = $this->get(route('admin.packages.create'));
    $response->assertStatus(200);
});

test('admin package detail route renders successfully', function () {
    $package = Package::create([
        'name' => 'Admin Test Package',
        'tag' => 'admin',
        'description' => 'Admin package description',
        'base_price' => 150.00,
        'down_payment' => 15.00,
        'duration' => 5,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(20)->toDateString(),
        'highlights' => json_encode(['Admin highlight']),
        'itineraries' => json_encode(['Admin itinerary']),
        'inclusions' => json_encode(['Admin inclusions']),
        'exclusions' => json_encode(['Admin exclusions']),
        'notes' => json_encode(['Admin note']),
        'destination' => 'Admin Destination',
        'season' => 'Admin Season',
        'is_foreign_only' => false,
    ]);

    $response = $this->get(route('admin.packages.details', ['id' => $package->id]));
    $response->assertStatus(200);
});

test('admin create package route stores a new package', function () {
    $response = $this->post(route('admin.packages.store'), [
        'name' => 'New Package',
        'tag' => 'new',
        'description' => 'New package description',
        'base_price' => 200.00,
        'down_payment' => 20.00,
        'duration' => 7,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(14)->toDateString(),
        'highlights' => 'Highlight one',
        'itineraries' => 'Itinerary one',
        'inclusions' => 'Inclusions text',
        'exclusions' => 'Exclusions text',
        'notes' => 'Notes text',
        'destination' => 'New Destination',
        'season' => 'Summer',
        'is_foreign_only' => true,
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('packages', ['name' => 'New Package']);
});

test('admin package group update route saves changes and new cover image', function () {
    Storage::fake('public');

    $group = PackageGroup::create([
        'title' => 'Original Group',
        'description' => 'Original description',
        'include_as_outbound' => false,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $newImage = UploadedFile::fake()->image('group-new.jpg');

    $response = $this->put(route('admin.packages.groups.update', ['id' => $group->id]), [
        'title' => 'Updated Group',
        'description' => 'Updated description',
        'include_as_outbound' => true,
        'include_as_inbound' => true,
        'is_featured' => true,
        'image' => $newImage,
    ]);

    $response->assertRedirect(route('admin.packages.groups.edit', ['id' => $group->id]));
    $this->assertDatabaseHas('package_groups', ['id' => $group->id, 'title' => 'Updated Group', 'description' => 'Updated description']);
    $this->assertDatabaseHas('media', ['mediable_type' => $group->getMorphClass(), 'mediable_id' => $group->id, 'file_name' => 'group-new.jpg']);
});
