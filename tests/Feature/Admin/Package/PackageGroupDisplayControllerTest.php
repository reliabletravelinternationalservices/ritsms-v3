<?php

use App\Models\PackageGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package group list page renders successfully', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    PackageGroup::create([
        'title' => 'Group List',
        'description' => 'Group description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $response = $this->get(route('admin.packages.groups'));

    $response->assertStatus(200);
});

test('admin can toggle package group featured status', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Group Feature',
        'description' => 'Feature toggle description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $response = $this->put(route('admin.packages.groups.feature', ['id' => $group->id]));

    $response->assertRedirect(route('admin.packages.groups'));
    expect($group->fresh()->is_featured)->toBeTrue();
});

test('admin can delete package group', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $group = PackageGroup::create([
        'title' => 'Group Delete',
        'description' => 'Group delete description.',
        'include_as_outbound' => true,
        'include_as_inbound' => false,
        'is_featured' => false,
    ]);

    $response = $this->delete(route('admin.packages.groups.destroy', ['id' => $group->id]));

    $response->assertRedirect(route('admin.packages.groups'));
    expect(PackageGroup::find($group->id))->toBeNull();
});
