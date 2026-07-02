<?php

use App\Models\User;

test('admin booking management page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('admin.bookings'));

    $response->assertStatus(200);
});
