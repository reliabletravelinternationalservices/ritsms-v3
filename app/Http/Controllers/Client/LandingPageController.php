<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function __construct(protected PackageGroupRepository $packageGroupRepository){}
    public function index()
    {
        $inbound = $this->packageGroupRepository->getFirstFeaturedInboundGroupPackages();
        $outbound = $this->packageGroupRepository->getFirstFeaturedOutboundGroupPackages();

        return Inertia::render('client/home/LandingPage', compact('inbound', 'outbound'));
    }
}
