<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Services\Tour\TourService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TourManagementController extends Controller
{
    public function __construct(
        protected TourService $tourService
    ) {}

    public function index(Request $request): Response
    {
        $tours = $this->tourService->getTours(
            [
                'itineraries',
                'routes',
                'routes.departureCountry',
                'routes.destinationCountry',
                'hotels',
                'departures',
                'media',
            ],
            $request->only([
                'page',
                'per_page',
                'state',
                'category',
                'visibility',
                'destination',
                'search',
            ]),
        );

        $stats = $this->stats();

        $countries = Country::query()
            ->select([
                'id',
                'name',
            ])
            ->orderBy('name')
            ->get();
    
        return Inertia::render(
            'admin/tour/TourManagement',
            compact(
                'stats',
                'tours',
                'countries'
            )
        );
    }

    private function stats(): array
    {
        return [
            'totalTour' => $this->tourService->getTourTotalCount(),
            'totalPublishedTour' => $this->tourService->getTourTotalCount(true),
        ];
    }
}