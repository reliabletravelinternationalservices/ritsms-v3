<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tour\TourRequest;
use App\Models\Country;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditTourController extends Controller
{
    public function edit(string $slug): \Inertia\Response
    {
        $tour = Tour::with(['itineraries'])
            ->where('slug', $slug)
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
        $validatedData = $request->validated();
        
        $tour->update($validatedData['overview']);

        $tour->itineraries()->delete();
        if (!empty($validatedData['itineraries'])) {
            $tour->itineraries()->createMany($validatedData['itineraries']);
        }
        return redirect()->route('admin.tours.edit', ['slug' => $tour->slug])->with('success', 'Tour saved successfully.');
    }
}
