<?php

use App\Models\PackageGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can toggle package group featured status on and off', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Feature Toggle Group',
        'description' => 'Feature toggle test description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $response = $this->put(route('admin.packages.groups.feature', ['id' => $group->id]));
    $response->assertRedirect(route('admin.packages.groups'));
    expect($group->fresh()->is_featured)->toBeTrue();

    $response = $this->put(route('admin.packages.groups.feature', ['id' => $group->id]));
    $response->assertRedirect(route('admin.packages.groups'));
    expect($group->fresh()->is_featured)->toBeFalse();
});
