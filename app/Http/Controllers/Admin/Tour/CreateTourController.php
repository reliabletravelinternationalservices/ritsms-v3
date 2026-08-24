<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tour\TourRequest;
use App\Models\Tour;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateTourController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('admin/tour/CreateTour');
    }


    
    public function store(TourRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $tour = Tour::create($validatedData['overview']);

        return to_route('admin.tours.edit', ['slug' => $tour->slug])->with('success', 'Tour saved successfully.');
    }
}
