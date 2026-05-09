<?php

namespace App\Http\Controllers\Client\Country;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCountryController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}
    public function index()
    {
        $destinations = $this->repository->getAllDestinations();
        return Inertia::render('client/country/ServiceCountryPage', compact('destinations'));
    }
}
