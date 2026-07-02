<?php

use App\Models\User;

test('admin inquiries page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('admin.inquiries'));

    $response->assertStatus(200);
});
