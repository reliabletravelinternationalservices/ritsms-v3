<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminManagementController extends Controller
{
    public function index()
    {
        $admins = User::all();
        return Inertia::render('admin/user/admin/AdminManagement', compact('admins'));
    }
}
