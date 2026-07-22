<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Api\V1\PackageRepository;

class PackageController extends Controller
{
    public function __construct(private PackageRepository $repo){}
    public function getPackages(Request $request)
    {

        return  $this->repo->fetchPackages($request->all());
    }

    public function getGroupedPackage(Request $request)
    {
        return  $this->repo->fetchGroupedPackages($request->all());
    }
}
