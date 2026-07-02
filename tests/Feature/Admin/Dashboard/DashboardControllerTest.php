<?php

use App\Models\User;
use App\Repository\Dashboard\DashboardRepository;

test('admin dashboard page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);

    $this->mock(DashboardRepository::class)->shouldReceive('getDashboardData')->andReturn([
        'packages' => ['count' => 0, 'trend_value' => 0, 'trend_type' => 'neutral'],
        'destinations' => ['count' => 0, 'trend_value' => 0, 'trend_type' => 'neutral'],
        'inquiries' => ['count' => 0, 'trend_value' => 0, 'trend_type' => 'neutral'],
        'collections' => ['count' => 0, 'trend_value' => 0, 'trend_type' => 'neutral'],
        'bookings' => ['count' => 0, 'trend_value' => 0, 'trend_type' => 'neutral'],
        'monthly_inquiries' => [],
    ]);

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertStatus(200);
});
