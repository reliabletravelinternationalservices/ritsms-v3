<?php

use App\Models\User;
use Illuminate\Support\Facades\Storage;

test('admin account deletion redirects back to the admin list', function () {
    Storage::fake('public');

    $user = User::factory()->create(['display_name' => 'Test User', 'status' => 'active']);
    $admin = User::factory()->create([
        'display_name' => 'Admin To Delete',
        'status' => 'active',
        'avatar' => 'upload/user/admin/1/test-avatar.jpg',
    ]);

    $response = $this->actingAs($user)->delete(route('admin.users.admins.destroy', ['id' => $admin->id]));

    $response->assertRedirect(route('admin.users.admins'));
    $this->assertDatabaseMissing('users', ['id' => $admin->id]);
});
