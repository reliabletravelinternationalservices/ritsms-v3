<?php

use App\Models\User;

test('password settings page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('password.edit'));

    $response->assertStatus(200);
});

test('password can be updated', function () {
    $user = User::factory()->create([
        'display_name' => 'Test User',
        'status' => 'active',
        'password' => bcrypt('old-password'),
    ]);

    $response = $this->actingAs($user)->put(route('password.update'), [
        'current_password' => 'old-password',
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ]);

    $response->assertRedirect();
});
