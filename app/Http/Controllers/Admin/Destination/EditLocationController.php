<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Destination\EditLocationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repository\Destination\DestinationLocationRepository;
use App\Repository\Destination\DestinationRepository;

class EditLocationController extends Controller
{
    public function __construct(protected DestinationRepository $repository, protected DestinationLocationRepository $repositoryLocation) {}
    public function index(int $destID, int $id)
    {
        $destination = $this->repository->getDestinationByID($destID);
        $location = $this->repositoryLocation->getLocationByID($id);
        return Inertia::render('admin/destination/EditLocation', compact('destination', 'location'));
    }

    public function update(EditLocationRequest $request, int $destID, int $id)
    {
        $validatedData = $request->validated();

        $this->repositoryLocation->updateLocation($id, $validatedData);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $this->repositoryLocation->updateLocationImage($id, $request->file('image'));
        } elseif ($request->input('remove_image')) {
            $this->repositoryLocation->deleteLocationImage($id);
        }

        return redirect()->route('admin.destinations.details', $destID)->with('success', 'Location updated successfully.');
    }
}
