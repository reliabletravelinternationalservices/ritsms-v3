<?php

use App\Models\Media;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('admin can save tour media in the correct order', function () {
    $user = User::create([
        'code' => 'ADM-TEST-001',
        'email' => 'tour-admin@example.com',
        'password' => bcrypt('password'),
        'display_name' => 'Test User',
        'is_active' => true,
    ]);

    $this->actingAs($user);

    Storage::fake('public');

    $tour = Tour::create([
        'name' => 'Sample Tour',
        'badge' => 'Best seller',
        'description' => 'Trip description',
        'highlights' => 'Highlight one',
        'inclusions' => 'Inclusions',
        'exclusions' => 'Exclusions',
        'terms_and_conditions' => 'Terms',
        'category' => 'domestic',
        'duration' => 4,
        'itinerary_type' => 'round_trip',
        'booking_deadline' => now()->addDays(10)->toDateString(),
        'notes' => null,
    ]);

    $existingMedia = Media::create([
        'mediable_id' => $tour->id,
        'mediable_type' => $tour->getMorphClass(),
        'collection' => 'gallery',
        'file_name' => 'old-1.webp',
        'file_path' => 'tours/'.$tour->id.'/gallery/old-1.webp',
        'disk' => 'public',
        'type' => 'image',
        'mime_type' => 'image/webp',
        'size' => 1100,
        'alt_text' => 'old-1',
        'order_number' => 1,
    ]);

    Media::create([
        'mediable_id' => $tour->id,
        'mediable_type' => $tour->getMorphClass(),
        'collection' => 'gallery',
        'file_name' => 'old-2.webp',
        'file_path' => 'tours/'.$tour->id.'/gallery/old-2.webp',
        'disk' => 'public',
        'type' => 'image',
        'mime_type' => 'image/webp',
        'size' => 1200,
        'alt_text' => 'old-2',
        'order_number' => 2,
    ]);

    $fileOne = UploadedFile::fake()->image('first-image.jpg', 1600, 900);
    $fileTwo = UploadedFile::fake()->image('second-image.jpg', 1600, 900);

    $response = $this->put(route('admin.tours.update', ['tour' => $tour->id]), [
        'overview' => json_encode([
            'name' => 'Sample Tour',
            'badge' => 'Best seller',
            'description' => 'Trip description',
            'highlights' => 'Highlight one',
            'inclusions' => 'Inclusions',
            'exclusions' => 'Exclusions',
            'terms_and_conditions' => 'Terms',
            'category' => 'domestic',
            'duration' => 4,
            'itinerary_type' => 'round_trip',
            'booking_deadline' => now()->addDays(10)->toDateString(),
        ]),
        'itineraries' => '[]',
        'routes' => '[]',
        'hotels' => '[]',
        'schedules' => json_encode([
            [
                'departure_date' => now()->addDays(2)->toDateString(),
                'return_date' => now()->addDays(5)->toDateString(),
                'base_price' => 1200,
                'discounted_price' => null,
                'min_pax' => 2,
                'max_pax' => 10,
                'airline_name' => 'Airline',
                'departure_flight_no' => 'AB123',
                'return_flight_no' => 'BA456',
                'is_active' => true,
            ],
        ]),
        'images' => [$fileOne, $fileTwo],
    ]);

    $response->assertRedirect();

    $tour->refresh();
    $gallery = $tour->media()->where('collection', 'gallery')->orderBy('order_number')->get();

    expect($gallery)->toHaveCount(4);
    expect($gallery->pluck('order_number')->all())->toBe([1, 2, 3, 4]);
    expect($gallery->last()->file_name)->toContain('jpg');
    expect($gallery->first()->id)->toBe($existingMedia->id);
});
