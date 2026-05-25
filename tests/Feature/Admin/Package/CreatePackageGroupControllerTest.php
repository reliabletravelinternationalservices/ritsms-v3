<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package group create page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $response = $this->get(route('admin.packages.groups.create'));

    $response->assertStatus(200);
});

test('admin package group store route saves a new group and redirects to groups list', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $response = $this->post(route('admin.packages.groups.store'), [
        'title' => 'New Group',
        'description' => 'New group description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => true,
    ]);

    $response->assertRedirect(route('admin.packages.groups'));
    $this->assertDatabaseHas('package_groups', ['title' => 'New Group', 'description' => 'New group description.']);
});
