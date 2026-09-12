<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;

class ServicePackageController extends Controller
{
    public function __construct(private PackageRepository $repository){}
    public function index()
    {
        $packages = $this->repository->getPackages();
        $metrics = $this->repository->getPackagesStatisticData();
        $countries = $this->repository->getDistinctCountries();
        return inertia('admin/package/ServicePackage', compact('packages', 'metrics', 'countries'));
    }
}
