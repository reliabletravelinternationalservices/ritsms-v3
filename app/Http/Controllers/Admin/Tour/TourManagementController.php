<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Services\Tour\TourService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Country;

class TourManagementController extends Controller
{
    public function __construct(protected TourService $tourService) {}
    //

    public function index(): Response
    {
        $tours = $this->tourService->getTours(['itineraries', 'routes', 'hotels', 'departures',  'media']);
        $stats = $this->stats();
        $countries = Country::query()
            ->select([
                'id',
                'name',
            ])
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/tour/TourManagement', compact('stats', 'tours', 'countries'));
    }


    private function stats()
    {
        return [
            'totalTour' =>  $this->tourService->getTourTotalCount(),
            'totalPublishedTour' => $this->tourService->getTourTotalCount(true)
        ];
    }
}
