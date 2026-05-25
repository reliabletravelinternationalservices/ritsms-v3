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
