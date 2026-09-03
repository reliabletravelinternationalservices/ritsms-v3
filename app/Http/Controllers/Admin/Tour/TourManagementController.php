<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Services\Tour\TourService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TourManagementController extends Controller
{
    public function __construct(protected TourService $tourService) {
    }
    //

    public function index(): Response
    {
        $tour = $this->tourService->getTours();
        return Inertia::render('admin/tour/TourManagement', compact('tour'));
    }
}
