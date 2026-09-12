<?php

namespace App\Http\Controllers\Admin\Booking;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/booking/BookingManagement');
    }
}
