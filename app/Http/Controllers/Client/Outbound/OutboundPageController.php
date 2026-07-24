<?php

namespace App\Http\Controllers\Client\Outbound;

use App\Http\Controllers\Controller;
use App\Models\PackageGroup;
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


    public function groupDetail(string $slug)
    {   
        $group = PackageGroup::select(['id', 'title', 'description', 'slug'])
            ->with('image:id,mediable_id,mediable_type,file_name,file_path,alt_text')
            ->where('slug', $slug)->firstOrFail();

        $this->service->initializeGroupDetailPageSEO($group);
        
        $params =[
            'group' => $group,
            'isInbound' => false
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
