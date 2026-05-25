<?php

use App\Http\Middleware\Admin\AuthAdmin;
use App\Models\Media;
use App\Models\Package;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

it('allows deleting all package images and removes storage files', function () {
    $this->withoutMiddleware(AuthAdmin::class);
    $this->actingAs(User::factory()->create([
        'display_name' => 'Test User',
    ]));

    Storage::fake('public');

    $package = Package::create([
        'name' => 'Test Package',
        'tag' => 'test',
        'description' => 'Test description',
        'base_price' => 100.00,
        'down_payment' => 20.00,
        'duration' => 3,
        'selling_start_date' => now()->toDateString(),
        'selling_end_date' => now()->addDays(30)->toDateString(),
        'highlights' => json_encode(['highlight one']),
        'itineraries' => json_encode(['day 1 itinerary']),
        'inclusions' => 'Inclusions text',
        'exclusions' => 'Exclusions text',
        'destination' => 'Test Destination',
        'season' => 'All Year',
        'is_foreign_only' => false,
    ]);

    $filePath1 = "upload/package/{$package->id}/photo-1.jpg";
    $filePath2 = "upload/package/{$package->id}/photo-2.jpg";

    Storage::disk('public')->put($filePath1, 'fake-content-1');
    Storage::disk('public')->put($filePath2, 'fake-content-2');

    $media1 = Media::create([
        'mediable_id' => $package->id,
        'mediable_type' => $package->getMorphClass(),
        'file_name' => 'photo-1.jpg',
        'file_path' => $filePath1,
        'url' => Storage::disk('public')->url($filePath1),
        'disk' => 'local',
        'type' => 'image',
        'mime_type' => 'image/jpeg',
        'size' => 100,
        'alt_text' => 'Photo 1',
        'order_number' => 1,
        'is_primary' => false,
    ]);

    $media2 = Media::create([
        'mediable_id' => $package->id,
        'mediable_type' => $package->getMorphClass(),
        'file_name' => 'photo-2.jpg',
        'file_path' => $filePath2,
        'url' => Storage::disk('public')->url($filePath2),
        'disk' => 'local',
        'type' => 'image',
        'mime_type' => 'image/jpeg',
        'size' => 110,
        'alt_text' => 'Photo 2',
        'order_number' => 2,
        'is_primary' => true,
    ]);

    $response = $this->put(route('admin.packages.images.update', ['id' => $package->id]), [
        'deleted_ids' => [$media1->id, $media2->id],
        'meta' => [],
    ]);

    $response->assertStatus(302);

    $this->assertDatabaseMissing('media', ['id' => $media1->id]);
    $this->assertDatabaseMissing('media', ['id' => $media2->id]);
    Storage::disk('public')->assertMissing($filePath1);
    Storage::disk('public')->assertMissing($filePath2);
});
