<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Destination\CreateDestinationRequest;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateDestinationController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}
    public function index()
    {
        return Inertia::render('admin/destination/CreateDestination');
    }


    public function store(CreateDestinationRequest $request)
    {
        $validatedData = $request->validated();

        $destination = $this->repository->createDestination($validatedData);

        if ($request->hasFile('image')) {
            $this->repository->storeDestinationImage($validatedData, $destination->id);
        }
        
        return redirect()->route('admin.destinations')->with('success', 'Destination created successfully!');
    }
}
