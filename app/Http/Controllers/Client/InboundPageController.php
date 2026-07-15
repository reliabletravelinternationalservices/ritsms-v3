<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Client\InboundPageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class InboundPageController extends Controller
{
    public function __construct(
        protected InboundPageService $service
    ) {}

    public function index()
    {
        $this->service->initializeRootPageSEO();
        return Inertia::render('client/inbound/InboundPage', $this->service->getInboundPageData());
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
