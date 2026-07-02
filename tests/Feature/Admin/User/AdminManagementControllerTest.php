<?php

use App\Models\User;

test('admin management page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('admin.users.admins'));

    $response->assertStatus(200);
});
