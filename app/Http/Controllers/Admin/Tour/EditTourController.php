<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tour\TourRequest;
use App\Models\Country;
use App\Models\Tour;
use App\Services\MediaService;
use App\Services\Tour\TourService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class EditTourController extends Controller
{
    public function __construct(
        protected MediaService $service,
        protected TourService $tourService
    ) {}

    public function edit(string $slug): Response
    {
        $tour = $this->tourService->getTourBySlug($slug, ['itineraries', 'routes', 'hotels', 'departures',  'media']);

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
        ) {
            $validatedData = $request->validated();
            $this->tourService->update($tour, $validatedData['overview']);

            if (! empty($validatedData['itineraries'])) {
                $this->tourService->updateItineraries($tour, $validatedData['itineraries']);
            }

            if (! empty($validatedData['routes'])) {
                $this->tourService->updateRoutes($tour, $validatedData['routes']);
            }

            if (! empty($validatedData['hotels'])) {
                $this->tourService->updateHotels($tour, $validatedData['hotels']);
            }

            if (! empty($validatedData['departures'])) {
                $this->tourService->updateDepartures($tour, $validatedData['departures']);
            }

            // Remove media
            if (! empty($validatedData['removed_media_ids'])) {
                $this->tourService->deleteMediaById($tour, $validatedData['removed_media_ids']);
            }

            if (! empty($validatedData['media_order'])) {
                $this->tourService->updateMediaOrder($tour, $validatedData['media_order']);
            }

            // New images
            if ($request->hasFile('images')) {
                $this->tourService->updateMultipleImages($tour, $request->file('images', []));
            }

            // New video
            if ($request->hasFile('video')) {
                $this->tourService->createVideo($tour, $request->file('video'));
            }
        });

        return redirect()->route('admin.tours.edit', ['slug' => $tour->slug])->with('success', 'Tour saved successfully.');
    }

    public function updateStatus(Request $request, Tour $tour)
    {
        $validatedData = $request->validate([
            'state' => 'required|string|in:draft,published,archived',
            'visibility' => 'required|string|in:public,private',
        ]);
        DB::transaction(function () use ($tour, $validatedData){
            $this->tourService->updateStatus($tour, $validatedData);
        });

        return redirect()->route('admin.tours.edit', ['slug' => $tour->slug])
            ->with('success', 'Tour status changed.');
        
    }
}
