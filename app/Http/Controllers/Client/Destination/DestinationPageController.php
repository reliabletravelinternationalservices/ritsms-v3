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
        $destination = Destination::select(['id', 'title', 'description', 'country', 'tag'])
        ->with(['locations:id,destination_id,name,description,map_link', 'image:id,mediable_id,mediable_type,url,alt_text,file_name,file_path', 'locations.image:id,mediable_id,mediable_type,alt_text,file_name,file_path'])
        ->where('slug', $slug)->firstOrFail();

        $this->service->initializeDestinationPageSEO($destination);

        return Inertia::render('client/location/LocationPage', compact('destination'));
    }
}
