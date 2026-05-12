<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServicePackageController extends Controller
{
    public function index()
    {
        return inertia('admin/package/ServicePackage');
    }
}
