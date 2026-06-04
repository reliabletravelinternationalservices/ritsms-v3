<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Repository\Dashboard\DashboardRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private DashboardRepository $dashboardRepository) {}

    public function index()
    {
        return Inertia::render('admin/dashboard/DashboardPage', [
            'dashboardData' => $this->dashboardRepository->getDashboardData(),
        ]);
    }
}
