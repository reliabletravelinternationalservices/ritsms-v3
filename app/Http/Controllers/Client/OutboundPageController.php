<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
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

        View::share('seo', [
            'title' => 'Explore International Destinations With Us',
            'description' => "Discover our exclusive outbound travel packages, featuring top destinations worldwide. Whether you're seeking adventure, culture, or relaxation, we have the perfect package for you. Explore our featured and normal groups to find your next unforgettable travel experience.",
            'image' => asset('storage/upload/agency/outbound_image.png'),
            'url' => url()->current(),
        ]);

        return Inertia::render('client/outbound/OutboundPage', compact('groups'));
    }
}
