<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Api\V1\PackageRepository;

class PackageController extends Controller
{
    public function __construct(private PackageRepository $repo){}
    public function getPackages()
    {
        return  $this->repo->fetchPackages();
    }
    
    public function getOutboundPackages()
    {
        return  $this->repo->fetchInboundOutboundPackages(false);
    }
    
    public function getInboundPackages()
    {
        return  $this->repo->fetchInboundOutboundPackages(true);
    }
}
