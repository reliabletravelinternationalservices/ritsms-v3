<?php

namespace App\Http\Controllers\Client\Location;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\DestinationLocation;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}
    public function index(Destination $destination)
    {
        $destination = $this->repository->getDestinationByID($destination->id);
        
        View::shared('seo', [
            'title' => $destination->title,
            'description' => $destination->description,
            'image' => asset($destination->image->url?? 'storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/location/LocationPage', compact('destination'));
    }
}
