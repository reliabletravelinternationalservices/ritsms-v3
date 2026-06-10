<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/user/admin/AdminManagement');
    }
}
