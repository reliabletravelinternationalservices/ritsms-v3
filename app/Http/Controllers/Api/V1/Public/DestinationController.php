<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Services\Api\V1\DestinationRepository;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function __construct(private DestinationRepository $repo){}
    public function getCountries()
    {
        return $this->repo->fetchCountries();
    }

    public function getCountry(string $country)
    {
        return $this->repo->fetchCountry($country);
    }
}
