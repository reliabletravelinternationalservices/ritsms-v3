<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutboundPageController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository){}
    public function index()
    {
        $featuredGroupPackages = $this->repository->getPackageGroupByType('outbound', true);
        $groupPackages = $this->repository->getPackageGroupByType('outbound', false);

        $groups = [
            'featured' => $featuredGroupPackages->toArray(),
            'normal' => $groupPackages->toArray(),
        ];

        return Inertia::render('client/package/OutboundPage', compact('groups'));
    }
}
