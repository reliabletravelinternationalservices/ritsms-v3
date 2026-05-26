<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCountryController extends Controller
{
    public function index()
    {
        $destinations = Destination::with(['image', 'locations'])->get();

        return Inertia::render('admin/destination/ServiceCountry', [
            'destinations' => $destinations,
        ]);
    }

    public function show(int $destination)
    {
        $destination = Destination::with(['image', 'locations'])->findOrFail($destination);

        return Inertia::render('admin/destination/DestinationDetail', [
            'destination' => $destination,
        ]);
    }
}
