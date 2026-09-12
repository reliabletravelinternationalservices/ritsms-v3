<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Destination\DestinationLocationRequest;
use App\Repository\Destination\DestinationLocationRepository;
use App\Repository\Destination\DestinationRepository;
use Inertia\Inertia;

class CreateLocationController extends Controller
{
    public function __construct(protected DestinationRepository $repository, protected DestinationLocationRepository $locationRepository) {}

    public function index(int $destID)
    {
        $destination = $this->repository->getDestinationByID($destID);

        return Inertia::render('admin/destination/CreateLocation', compact('destination'));
    }

    public function store(DestinationLocationRequest $request, int $destID)
    {
        $validatedData = $request->validated();
        $location = $this->locationRepository->createLocation($validatedData, $destID);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $this->locationRepository->createLocationImage($location, $request->file('image'));
        }

        return redirect()->route('admin.destinations.details', $destID)->with('success', 'Location created successfully.');
    }
}
