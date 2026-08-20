<?php

namespace Database\Seeders;

use App\Services\Country\CountryService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{

    public function __construct(
        private CountryService $service
    ) {}

    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->service->seedCountryData();
    }
}
