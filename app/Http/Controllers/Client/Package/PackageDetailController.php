<?php

namespace App\Http\Controllers\Client\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageDetailController extends Controller
{
    public function index(Package $package)
    {
        return Inertia::render('client/package/PackageDetailPage', compact('package'));
    }
}
