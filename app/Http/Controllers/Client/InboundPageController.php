<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\PackageGroup;
use App\Services\Client\InboundPageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InboundPageController extends Controller
{
    public function __construct(
        protected InboundPageService $service
    ) {}

    public function index()
    {
        $this->service->initializeRootPageSEO();
        return Inertia::render('client/inbound/InboundPage');
    }



    public function groupDetail(string $slug)
    {
        $group = PackageGroup::select(['id', 'title', 'description'])->with('image:id,mediable_id,mediable_type,file_name,file_path,alt_text')->where('slug', $slug)->first();
        $this->service->initializeGroupDetailPageSEO($group);
        $params =[
            'group' => $group,
            'isInbound' => true
        ];
        return Inertia::render('client/package/group/PackageGroupPage', compact('params'));
    }


    public function packageDetail(string $slug)
    {
        $package = $this->service->getPackageBySlug($slug);
        $this->service->initializePackageDetailPageSEO($package);
        return Inertia::render('client/package/detail/PackageDetailPage', $this->service->getPackageDetailPageData($package));
    }
}
