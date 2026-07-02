<?php

use App\Models\Setting;
use App\Models\User;

test('currency settings page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->get(route('currency.edit'));

    $response->assertStatus(200);
});

test('currency settings can be updated', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $response = $this->actingAs($user)->put(route('currency.update'), [
        'key' => 'usd_to_php_rate',
        'value' => '56.75',
        'type' => 'number',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('settings', ['key' => 'usd_to_php_rate', 'value' => '56.75']);
});
