<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Destination\EditDestinationRequest;
use App\Repository\Destination\DestinationRepository;
use Inertia\Inertia;

class EditDestinationController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}

    public function index(int $id)
    {
        $destination = $this->repository->getDestinationByID($id);
        return Inertia::render('admin/destination/EditDestination', compact('destination'));
    }

    public function update(EditDestinationRequest $request, int $id)
    {
        $validatedData = $request->validated();

        // Extract image-related fields before updating model
        unset($validatedData['image'], $validatedData['remove_image']);
        $this->repository->updateDestination($id, $validatedData);

        // Handle new image upload
        if ($request->hasFile('image')) {
            $this->repository->updateDestinationImage(['image' => $request->file('image')], $id);
        } elseif ($request->boolean('remove_image') && !$request->hasFile('image')) {
            $this->repository->deleteDestinationImage($id);
        }

        return redirect()->route('admin.destinations.details', ['id' => $id])
            ->with('success', 'Destination updated successfully!');
    }
}
