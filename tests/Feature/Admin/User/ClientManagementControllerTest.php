<?php

use App\Models\User;

test('client management page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('admin.users.clients'));

    $response->assertStatus(200);
});
