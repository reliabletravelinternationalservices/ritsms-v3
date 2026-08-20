<?php
namespace App\Services\Country;
use App\Helpers\Json\JsonHelper;
use App\Models\Country;
use App\Static\SeederPath;
use App\Repository\Destination\DestinationRepository;

class CountryService
{
    public function __construct(
        private JsonHelper $jsonHelper,
        private SeederPath $path,
    ) {}

    // =============================================================
    // Seed Country Data
    // =============================================================
    
    public function seedCountryData(): void
    {
        $countries = $this->jsonHelper->convertToCollection($this->path::COUNTRIES)->all();

        foreach ($countries as $country) {
            Country::create($country);
        }
    }
}