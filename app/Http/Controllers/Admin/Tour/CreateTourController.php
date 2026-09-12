<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tour\TourRequest;
use App\Models\Tour;
use App\Services\Tour\TourService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateTourController extends Controller
{
    public function __construct(protected TourService $service) 
    {
    }


    public function create(): Response
    {
        return Inertia::render('admin/tour/CreateTour');
    }


    
    public function store(TourRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $tour = $this->service->create($data['overview']);
        return to_route('admin.tours.edit', ['slug' => $tour->slug])->with('success', 'Tour saved successfully.');
    }
}
