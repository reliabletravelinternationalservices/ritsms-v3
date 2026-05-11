<?php

namespace App\Http\Controllers\Client\Location;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\DestinationLocation;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}
    public function index(Destination $destination)
    {
        $destination = $this->repository->getDestinationByID($destination->id);
        return Inertia::render('client/location/LocationPage', compact('destination'));
    }
}
