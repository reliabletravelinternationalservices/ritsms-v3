<?php

namespace App\Http\Controllers\Client\Package;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageGroupController extends Controller
{
    public function index()
    {
        return Inertia::render('client/package/PackageGroupPage');
    }
}
