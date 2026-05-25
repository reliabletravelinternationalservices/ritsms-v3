<?php

use App\Models\Package;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin package destroy route deletes a package and redirects to package list', function () {
    $this->actingAs(User::factory()->create(['display_name' => 'Test User']));

    $package = Package::create([
        'name' => 'Delete Package',
        'tag' => 'delete',
        'description' => 'Package to delete.',
        'base_price' => 120.00,
        'down_payment' => 10.00,
        'duration' => 4,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(5)->toDateString(),
        'highlights' => json_encode(['Highlight']),
        'itineraries' => json_encode([['day' => 1, 'title' => 'Intro', 'activity' => ['Activity']]]),
        'inclusions' => json_encode(['Inclusion']),
        'exclusions' => json_encode(['Exclusion']),
        'notes' => json_encode(['Note']),
        'destination' => 'Delete Destination',
        'season' => 'Autumn',
        'is_foreign_only' => false,
    ]);

    $response = $this->delete(route('admin.packages.destroy', ['id' => $package->id]));

    $response->assertRedirect(route('admin.packages'));
    $this->assertDatabaseMissing('packages', ['id' => $package->id]);
});
