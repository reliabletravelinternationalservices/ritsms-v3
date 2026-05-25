<?php

use App\Models\PackageGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can delete a package group', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Delete Group',
        'description' => 'Delete group test description.',
        'include_as_outbound' => false,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    $response = $this->delete(route('admin.packages.groups.destroy', ['id' => $group->id]));

    $response->assertRedirect(route('admin.packages.groups'));
    $this->assertDatabaseMissing('package_groups', ['id' => $group->id]);
});
