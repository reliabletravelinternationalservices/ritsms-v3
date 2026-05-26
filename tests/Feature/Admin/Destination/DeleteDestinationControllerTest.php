<?php

use App\Models\Destination;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can delete destination', function () {
    $user = User::factory()->create(['display_name' => 'Admin User']);
    $this->actingAs($user);

    $destination = Destination::create([
        'title' => 'Kyoto',
        'description' => 'Ancient capital of Japan',
        'country' => 'Japan',
        'tag' => 'historical',
    ]);

    $response = $this->delete(route('admin.destinations.destroy', ['id' => $destination->id]));

    $response->assertRedirect(route('admin.destinations'));
    $response->assertSessionHas('success', 'Destination deleted successfully!');

    $this->assertDatabaseMissing('destinations', ['id' => $destination->id]);
});
