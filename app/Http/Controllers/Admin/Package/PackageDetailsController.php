<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageDetailsController extends Controller
{
    public function __construct(protected PackageRepository $repository){}
    public function index(int $id)
    {
        $package = $this->repository->getPackageDetails($id);
        return Inertia::render('admin/package/PackageDetail', compact('package'));
    }
}
