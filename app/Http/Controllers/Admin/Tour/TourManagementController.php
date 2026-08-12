<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TourManagementController extends Controller
{
    //

    public function index(): Response
    {
        return Inertia::render('admin/tour/TourManagement');
    }
}
