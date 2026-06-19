<?php

namespace App\Http\Controllers\Client\Package;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class PackageDetailController extends Controller
{
    public function __construct(protected PackageRepository $repository) {}
    public function index(string $slug)
    {
        $type  = request()->segment(1);
        $isInbound = $type === 'inbound' ? true : false;
        $package = Package::where('slug', $slug)->firstOrFail();
        $package = $this->repository->getPackageDetails($package->id);

        View::share('seo', [
            'title' => $package->name,
            'description' => $package->description,
            'image' => asset($package->primaryImage->url?? 'storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/package/detail/PackageDetailPage', compact('package', 'isInbound'));
    }
}
