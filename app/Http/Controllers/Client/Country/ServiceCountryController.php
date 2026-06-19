<?php

namespace App\Http\Controllers\Client\Country;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class ServiceCountryController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}
    public function index()
    {
        $destinations = $this->repository->getAllDestinations();
        View::share('seo', [
            'title' => 'Countries & Destinations We Serve',
            'description' => 'We included all the countries that included in our services and currently expanding for more tourist destinations.',
            'image' => asset($destinations[0]->image->url?? 'storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/country/ServiceCountryPage', compact('destinations'));
    }
}
