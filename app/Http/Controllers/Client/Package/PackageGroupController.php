<?php

namespace App\Http\Controllers\Client\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class PackageGroupController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository){}
    public function index(int $id)
    {
        // If your URL is /outbound/something/else, segment(1) is "outbound"
        $type = request()->segment(1); 
        
        $isInbound = $type === 'inbound' ? true : false;
        $group = $this->repository->getPackageGroupByID($id);

        View::share('seo', [
            'title' => $group->title,
            'description' => $group->description,
            'image' => asset($group->image->url?? 'storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);
        return Inertia::render('client/package/group/PackageGroupPage', compact('group', 'isInbound'));
    }
}
