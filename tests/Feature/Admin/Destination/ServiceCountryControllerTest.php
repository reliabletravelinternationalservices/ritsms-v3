<?php

use App\Models\Destination;
use App\Models\DestinationLocation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin destinations index page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    Destination::create([
        'title' => 'Tokyo',
        'description' => 'Capital of Japan',
        'country' => 'Japan',
        'tag' => 'asia',
    ]);

    Destination::create([
        'title' => 'Paris',
        'description' => 'City of Light',
        'country' => 'France',
        'tag' => 'europe',
    ]);

    $response = $this->get(route('admin.destinations'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/destination/ServiceCountry')
        ->has('destinations', 2)
    );
});

test('admin destinations index returns empty list when no destinations exist', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->get(route('admin.destinations'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/destination/ServiceCountry')
        ->has('destinations', 0)
    );
});

test('admin destination show page renders successfully with destination details', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $destination = Destination::create([
        'title' => 'Kyoto',
        'description' => 'Ancient capital of Japan',
        'country' => 'Japan',
        'tag' => 'historical',
    ]);

    DestinationLocation::create([
        'destination_id' => $destination->id,
        'name' => 'Fushimi Inari',
        'description' => 'Famous shrine',
    ]);

    DestinationLocation::create([
        'destination_id' => $destination->id,
        'name' => 'Arashiyama Bamboo Grove',
        'description' => 'Beautiful bamboo forest',
    ]);

    $response = $this->get(route('admin.destinations.details', ['id' => $destination->id]));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/destination/DestinationDetail')
        ->where('destination.id', $destination->id)
        ->where('destination.title', 'Kyoto')
        ->where('destination.country', 'Japan')
        ->has('destination.locations', 2)
    );
});

test('admin destination show page returns 404 when destination not found', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $response = $this->get(route('admin.destinations.details', ['id' => 9999]));

    $response->assertStatus(404);
});

test('admin destination show includes eager loaded relationships', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $destination = Destination::create([
        'title' => 'Hokkaido',
        'description' => 'Northern island of Japan',
        'country' => 'Japan',
        'tag' => 'nature',
    ]);

    DestinationLocation::create([
        'destination_id' => $destination->id,
        'name' => 'Sapporo',
        'description' => 'Capital city',
    ]);

    $response = $this->get(route('admin.destinations.details', ['id' => $destination->id]));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->where('destination.locations.0.name', 'Sapporo')
    );
});
