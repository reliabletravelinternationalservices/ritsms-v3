<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateTourController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/tour/CreateTour');
    }
}
