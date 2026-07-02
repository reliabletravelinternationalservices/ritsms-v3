<?php

use App\Models\Inquiry;
use App\Models\User;

test('admin inquiry detail page renders successfully', function () {
    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);
    $inquiry = Inquiry::create([
        'fullname' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '123456789',
        'message' => 'Hello',
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)->get(route('admin.inquiries.details', ['id' => $inquiry->id]));

    $response->assertStatus(200);
});
