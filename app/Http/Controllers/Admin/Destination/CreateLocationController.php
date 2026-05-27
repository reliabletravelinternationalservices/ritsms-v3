<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Destination\DestinationLocationRequest;
use App\Repository\Destination\DestinationLocationRepository;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateLocationController extends Controller
{
    public function __construct(protected DestinationRepository $repository, protected DestinationLocationRepository $locationRepository){}
    public function index(int $destID)
    {
        $destination = $this->repository->getDestinationByID($destID);
        return Inertia::render('admin/destination/CreateLocation', compact('destination'));
    }

    public function store(DestinationLocationRequest $request, int $destID)
    {
        $validatedData = $request->validated();
        $this->locationRepository->createLocation($validatedData, $destID);
        return redirect()->intended(route('admin.destinations.edit', $destID))->with('success', 'Location created successfully!');
    }
}
