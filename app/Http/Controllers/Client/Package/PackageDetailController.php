<?php

namespace App\Http\Controllers\Client\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageDetailController extends Controller
{
    public function __construct(protected PackageRepository $repository){}
    public function index(Package $package)
    {
        $type  = request()->segment(1);
        $isInbound = $type === 'inbound' ? true : false;
        $package = $this->repository->getPackageDetails($package->id);
        return Inertia::render('client/package/detail/PackageDetailPage', compact('package', 'isInbound'));
    }
}
