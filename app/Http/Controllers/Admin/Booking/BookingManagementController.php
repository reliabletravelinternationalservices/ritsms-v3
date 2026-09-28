<?php

namespace App\Http\Controllers\Admin\Booking;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingManagementController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::paginate(10);
        $filters = [];
        return Inertia::render('admin/booking/BookingManagement', compact('bookings', 'filters'));
    }
}
