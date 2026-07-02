<?php

use App\Models\PackageGroup;

test('package group page renders successfully', function () {
    $group = PackageGroup::create([
        'title' => 'Test Group',
        'description' => 'Test group description',
        'include_as_outbound' => true,
        'include_as_inbound' => true,
        'is_featured' => false,
    ]);

    $response = $this->get(route('client.outbound.package.group', ['id' => $group->id]));

    $response->assertStatus(200);
});
