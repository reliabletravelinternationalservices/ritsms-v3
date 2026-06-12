<?php

use App\Models\Destination;
use App\Models\DestinationLocation;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->destination = Destination::factory()->create();
});

test('can view create location page', function () {
    $response = $this->actingAs($this->user)->get(
        route('admin.destinations.locations.create', ['destID' => $this->destination->id])
    );

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('admin/destination/CreateLocation')
            ->has('destination')
            ->where('destination.id', $this->destination->id)
    );
});

test('can create location with required fields only', function () {
    $response = $this->actingAs($this->user)->post(
        route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
        [
            'name' => 'Test Location',
            'description' => 'This is a test location',
            'map_link' => null,
            'image' => null,
        ]
    );

    $response->assertRedirect(route('admin.destinations.details', $this->destination->id));
    $this->assertDatabaseHas('destination_locations', [
        'destination_id' => $this->destination->id,
        'name' => 'Test Location',
        'description' => 'This is a test location',
    ]);
});

test('can create location with map link', function () {
    $response = $this->actingAs($this->user)->post(
        route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
        [
            'name' => 'Location with Map',
            'description' => 'Location with map link',
            'map_link' => 'https://maps.google.com/?q=test',
        ]
    );

    $response->assertRedirect();
    $this->assertDatabaseHas('destination_locations', [
        'name' => 'Location with Map',
        'map_link' => 'https://maps.google.com/?q=test',
    ]);
});

test('can create location with image upload', function () {
    Storage::fake('public');

    $image = UploadedFile::fake()->image('location.jpg', 800, 600);

    $response = $this->actingAs($this->user)->post(
        route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
        [
            'name' => 'Location with Image',
            'description' => 'Location with uploaded image',
            'map_link' => null,
            'image' => $image,
        ]
    );

    $response->assertRedirect();
    $location = DestinationLocation::where('name', 'Location with Image')->first();
    $this->assertNotNull($location);
    Storage::disk('public')->assertExists($location->image->file_path);
    $this->assertEquals(1, $location->image->is_primary);
});

test('validates required fields', function () {
    $response = $this->actingAs($this->user)->post(
        route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
        [
            'name' => '',
            'description' => '',
        ]
    );

    $response->assertInvalid(['name', 'description']);
});

test('validates map link format', function () {
    $response = $this->actingAs($this->user)->post(
        route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
        [
            'name' => 'Test',
            'description' => 'Test',
            'map_link' => 'not-a-valid-url',
        ]
    );

    $response->assertInvalid(['map_link']);
});

test('validates image file type', function () {
    Storage::fake('public');

    $invalidFile = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

    $response = $this->actingAs($this->user)->post(
        route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
        [
            'name' => 'Test Location',
            'description' => 'Test Description',
            'image' => $invalidFile,
        ]
    );

    $response->assertInvalid(['image']);
});

// test('validates image file size', function () {
//     Storage::fake('public');

//     $largeFile = UploadedFile::fake()->image('large.jpg')->size(6000);

//     $response = $this->actingAs($this->user)->post(
//         route('admin.destinations.locations.store', ['destID' => $this->destination->id]),
//         [
//             'name' => 'Test Location',
//             'description' => 'Test Description',
//             'image' => $largeFile,
//         ]
//     );

//     $response->assertInvalid(['image']);
// });
