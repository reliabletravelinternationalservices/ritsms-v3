<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageGroupDisplayController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/package/PackageGroupDisplay');
    }
}
