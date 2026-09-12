<?php

namespace App\Http\Controllers\Admin\Log;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/log/ActivityLog');
    }
}
