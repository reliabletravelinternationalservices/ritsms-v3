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

        return Inertia::render('client/destination/DestinationPage');
    }

    public function countries()
    {
        $this->service->initializeCountriesPageSEO();

        return Inertia::render('client/country/ServiceCountryPage');
    }

    public function country(string $slug)
    {
        $destination = $this->service->getDestinationBySlug($slug);
        $this->service->initializeDestinationPageSEO($destination['destination']);

        return Inertia::render('client/location/LocationPage', $destination);
    }
}
