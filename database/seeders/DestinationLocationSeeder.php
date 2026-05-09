<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Destination\DestinationLocationRepository;
use App\Static\SeederPath;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationLocationSeeder extends Seeder
{
    public function __construct(
        private JsonHelper $jsonHelper,
        private SeederPath $path,
        private DestinationLocationRepository $repository
    ){}
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = $this->jsonHelper->convertToCollection($this->path::DESTINATION_LOCATIONS)->all();
        $this->repository->createManyDestinationLocation($locations);
    }
}
