<?php

use App\Models\User;

test('edit admin account page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('admin.users.admins.edit', ['id' => $user->id]));

    $response->assertStatus(200);
});
