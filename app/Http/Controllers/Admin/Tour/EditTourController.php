<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tour\TourRequest;
use App\Models\Country;
use App\Models\Tour;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EditTourController extends Controller
{
    public function __construct(protected MediaService $service) {
    }

    public function edit(string $slug): \Inertia\Response
    {
        $tour = Tour::with(['itineraries', 'routes', 'hotels', 'departures',  'media'])
            ->where('slug', $slug)
            ->whereNull('deleted_at')
            ->firstOrFail();
    
        $countries = Country::query()
            ->select([
                'id',
                'name',
            ])
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/tour/EditTour', [
            'tour' => $tour,
            'countries' => $countries,
        ]);
    }


    public function update(TourRequest $request, Tour $tour)
    {

        DB::transaction(function () use (
        $request,
        $tour
        ){
            $validatedData = $request->validated();
            $tour->update($validatedData['overview']);


            $tour->itineraries()->forceDelete();
            if (!empty($validatedData['itineraries'])) {
                $tour->itineraries()->createMany($validatedData['itineraries']);
            }
            
            $tour->routes()->forceDelete();
            if (!empty($validatedData['routes'])) {
                $tour->routes()->createMany($validatedData['routes']);
            }

            $tour->hotels()->forceDelete();
            if (!empty($validatedData['hotels'])) {
                $tour->hotels()->createMany($validatedData['hotels']);
            }

            $tour->departures()->forceDelete();
            if (!empty($validatedData['schedules'])) {
                $tour->departures()->createMany($validatedData['schedules']);
            }

            // New images
            foreach ($request->file('images', []) as $image) {
                $path = $this->service->storeImage(
                    $image,
                    "tours/{$tour->id}/gallery",
                );

                $tour->media()->create([
                    'collection' => 'gallery',
                    'file_name' => basename($path),
                    'file_path' => $path,
                    'alt_text' => basename($path),
                    'disk' => 'public',
                    'type' => 'image',
                    'mime_type' => 'image/webp',
                ]);
            }

            // New video
            if ($request->hasFile('video')) {
                $path = $this->service->storeVideo(
                    $request->file('video'),
                    "tours/{$tour->id}/video",
                );

                $tour->media()->create([
                    'collection' => 'video',
                    'file_name' => basename($path),
                    'file_path' => $path,
                    'alt_text' => basename($path),
                    'disk' => 'public',
                    'type' => 'video',
                    'mime_type' => 'video/mp4',
                    'size' => Storage::disk('public')->size($path),
                ]);
            }
        });
        
        return redirect()->route('admin.tours.edit', ['slug' => $tour->slug])->with('success', 'Tour saved successfully.');
    }
}
