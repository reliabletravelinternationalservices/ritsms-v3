<?php

namespace App\Http\Controllers\Client\Outbound;

use App\Http\Controllers\Controller;
use App\Services\Client\OutboundPageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutboundPageController extends Controller
{
    public function __construct(protected OutboundPageService $service){}
    public function index()
    {
        $this->service->initializeRootPageSEO();
        return Inertia::render('client/outbound/OutboundPage');
    }


    public function groupDetail(int $id)
    {   
        $group = $this->service->getGroupDetailByID($id);
        $this->service->initializeGroupDetailPageSEO($group);
        return Inertia::render('client/package/group/PackageGroupPage', $this->service->geGroupPackagePageData($group));
    }


    public function packageDetail(string $slug)
    {
        $package = $this->service->getPackageBySlug($slug);
        $this->service->initializePackageDetailPageSEO($package);
        return Inertia::render('client/package/detail/PackageDetailPage', $this->service->getPackageDetailPageData($package));
    }
}
