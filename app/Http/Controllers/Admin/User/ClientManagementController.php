<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/user/client/ClientManagement');
    }
}
