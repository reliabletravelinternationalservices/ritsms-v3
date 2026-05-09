<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DestinationPageController extends Controller
{
    public function __construct(private DestinationRepository $repository) {}
    public function index()
    {
        $destinations = $this->repository->getAllDestinations();
        return Inertia::render('client/destination/DestinationPage', compact('destinations'));
    }
}
