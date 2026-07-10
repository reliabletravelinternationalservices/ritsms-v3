<?php

namespace App\Http\Controllers\Client\Destination;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Services\Client\DestinationPageService;
use Inertia\Inertia;

class DestinationPageController extends Controller
{
    public function __construct(private DestinationPageService $service) {}

    public function index()
    {
        $this->service->initializeRootPageSEO();

        return Inertia::render('client/destination/DestinationPage', $this->service->getAllDestinationData());
    }

    public function countries()
    {
        $data = $this->service->getAllDestinationData();
        $imageUrl = $data['destinations']->first()?->image?->url;
        $this->service->initializeCountriesPageSEO($imageUrl);

        return Inertia::render('client/country/ServiceCountryPage', $data);
    }

    public function country(Destination $destination)
    {
        $destination = $this->service->getDestinationByID($destination->id);
        $this->service->initializeDestinationPageSEO($destination['destination']);

        return Inertia::render('client/location/LocationPage', $destination);
    }
}
