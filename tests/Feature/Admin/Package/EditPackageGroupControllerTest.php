<?php

use App\Models\PackageGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package group edit page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Original Group',
        'description' => 'Original description.',
        'include_as_outbound' => false,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $response = $this->get(route('admin.packages.groups.edit', ['id' => $group->id]));

    $response->assertStatus(200);
});

test('admin package group update route updates a group and redirects back to edit page', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Original Group',
        'description' => 'Original description.',
        'include_as_outbound' => false,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $response = $this->put(route('admin.packages.groups.update', ['id' => $group->id]), [
        'title' => 'Updated Group',
        'description' => 'Updated description.',
        'include_as_outbound' => true,
        'include_as_inbound' => true,
        'is_featured' => true,
    ]);

    $response->assertRedirect(route('admin.packages.groups.edit', ['id' => $group->id]));
    $this->assertDatabaseHas('package_groups', ['id' => $group->id, 'title' => 'Updated Group', 'description' => 'Updated description.']);
});
