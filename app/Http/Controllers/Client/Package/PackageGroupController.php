<?php

namespace App\Http\Controllers\Client\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
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
        return Inertia::render('client/package/group/PackageGroupPage', compact('group', 'isInbound'));
    }
}
