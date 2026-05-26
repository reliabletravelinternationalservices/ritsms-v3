<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCountryController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}
    public function index()
    {
        $destinations = $this->repository->getAllDestinations();

        return Inertia::render('admin/destination/ServiceCountry', compact('destinations'));
    }

    public function show(int $destination)
    {
        $destination = $this->repository->getDestinationByID($destination);

        return Inertia::render('admin/destination/DestinationDetail', compact('destination'));
    }
}
