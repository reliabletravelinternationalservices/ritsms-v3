<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class DestinationPageController extends Controller
{
    public function __construct(private DestinationRepository $repository) {}
    public function index()
    {
        $destinations = $this->repository->getAllDestinations();

        View::share('seo', [
            'title' => 'Explore Most Popular Destinations Around The World',
            'description' => 'Discover the most popular destinations for your next adventure!. From breathtaking beaches to vibrant cities, explore the world with us and embark on unforgettable adventures.',
            'image' => asset($destinations[0]->image->url?? 'storage/upload/agency/logo.png'),
            'url' => url()->current(),
        ]);

        return Inertia::render('client/destination/DestinationPage', compact('destinations'));
    }
}
