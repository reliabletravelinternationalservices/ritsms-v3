<?php

use App\Models\User;

test('admin activity log page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('admin.logs'));

    $response->assertStatus(200);
});
