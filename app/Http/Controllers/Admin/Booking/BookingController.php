<?php

namespace App\Http\Controllers\Admin\Booking;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BookingController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('admin/booking/Bookings');
    }
}
