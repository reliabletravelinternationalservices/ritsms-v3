<?php

use App\Models\Destination;
use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('admin destination edit page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $destination = Destination::create([
        'title' => 'Kyoto',
        'description' => 'Ancient capital of Japan',
        'country' => 'Japan',
        'tag' => 'historical',
    ]);

    $response = $this->get(route('admin.destinations.edit', ['id' => $destination->id]));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/destination/EditDestination')
        ->where('destination.id', $destination->id)
    );
});

test('admin can update destination details', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $destination = Destination::create([
        'title' => 'Kyoto',
        'description' => 'Ancient capital of Japan',
        'country' => 'Japan',
        'tag' => 'historical',
    ]);

    $response = $this->put(route('admin.destinations.update', ['id' => $destination->id]), [
        'title' => 'Kyoto Updated',
        'description' => 'Updated description',
        'country' => 'Japan',
        'tag' => 'updated-tag',
    ]);

    $response->assertRedirect(route('admin.destinations.details', ['id' => $destination->id]));
    $response->assertSessionHas('success', 'Destination updated successfully!');

    $this->assertDatabaseHas('destinations', [
        'id' => $destination->id,
        'title' => 'Kyoto Updated',
        'tag' => 'updated-tag',
    ]);
});

test('admin can update destination image', function () {
    Storage::fake('public');

    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $destination = Destination::create([
        'title' => 'Kyoto',
        'description' => 'Ancient capital of Japan',
        'country' => 'Japan',
        'tag' => 'historical',
    ]);

    $image = UploadedFile::fake()->image('destination.jpg', 800, 600);

    $response = $this->put(route('admin.destinations.update', ['id' => $destination->id]), [
        'title' => 'Kyoto',
        'description' => 'Ancient capital of Japan',
        'country' => 'Japan',
        'tag' => 'historical',
        'image' => $image,
    ]);

    $response->assertRedirect(route('admin.destinations.details', ['id' => $destination->id]));
    $response->assertSessionHas('success', 'Destination updated successfully!');

    $this->assertDatabaseHas('media', [
        'mediable_id' => $destination->id,
        'mediable_type' => Destination::class,
        'file_name' => 'destination.jpg',
    ]);

    $media = Media::where('mediable_id', $destination->id)
        ->where('mediable_type', Destination::class)
        ->first();

    $this->assertNotNull($media);
    Storage::disk('public')->assertExists($media->file_path);
});
