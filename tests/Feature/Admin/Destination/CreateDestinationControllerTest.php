<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('admin create destination index page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->get(route('admin.destinations.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/destination/CreateDestination')
    );
});

test('admin can create destination with valid data', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => 'Bangkok',
        'country' => 'Thailand',
        'description' => 'City of Angels',
        'tags' => null,
    ]);

    $response->assertRedirect(route('admin.destinations'));
    $response->assertSessionHas('success', 'Destination created successfully!');

    $this->assertDatabaseHas('destinations', [
        'title' => 'Bangkok',
        'country' => 'Thailand',
        'description' => 'City of Angels',
    ]);
});

test('admin cannot create destination without required fields', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => 'Bangkok',
        // Missing country and description
    ]);

    $response->assertSessionHasErrors(['country', 'description']);
});

test('admin can create destination with image', function () {
    Storage::fake('public');

    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $image = UploadedFile::fake()->image('destination.jpg', 800, 600);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => 'Venice',
        'country' => 'Italy',
        'description' => 'City of Canals',
        'tags' => null,
        'image' => $image,
    ]);

    $response->assertRedirect(route('admin.destinations'));

    $this->assertDatabaseHas('destinations', [
        'title' => 'Venice',
        'country' => 'Italy',
    ]);

    // Verify the destination was created (image storage happens in controller)
    $destination = \App\Models\Destination::where('title', 'Venice')->first();
    $this->assertNotNull($destination);
});

test('admin cannot upload non-image file as destination image', function () {
    Storage::fake('public');

    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $file = UploadedFile::fake()->create('document.pdf', 100);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => 'Rome',
        'country' => 'Italy',
        'description' => 'Eternal City',
        'image' => $file,
    ]);

    $response->assertSessionHasErrors('image');
});

test('admin can create destination with null image', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => 'Barcelona',
        'country' => 'Spain',
        'description' => 'City of Modernism',
        'tags' => null,
    ]);

    $response->assertRedirect(route('admin.destinations'));
    $this->assertDatabaseHas('destinations', [
        'title' => 'Barcelona',
        'country' => 'Spain',
    ]);
});

test('country field has max 255 characters validation', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $longCountry = str_repeat('a', 256);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => 'Test Destination',
        'country' => $longCountry,
        'description' => 'Test Description',
    ]);

    $response->assertSessionHasErrors('country');
});

test('admin destination creation requires proper form data validation', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->post(route('admin.destinations.store'), [
        'title' => '',
        'country' => '',
        'description' => '',
    ]);

    $response->assertSessionHasErrors(['title', 'country', 'description']);
});
