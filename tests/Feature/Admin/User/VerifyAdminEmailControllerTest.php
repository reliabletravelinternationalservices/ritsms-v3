<?php

use App\Models\User;

test('admin verification email endpoint responds with a redirect', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->post(route('admin.verify.email.send'), [
        'id' => $user->id,
        'email' => $user->email,
    ]);

    $response->assertRedirect();
});
