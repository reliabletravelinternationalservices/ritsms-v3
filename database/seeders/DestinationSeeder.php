<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Destination\DestinationRepository;
use App\Static\SeederPath;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{

    public function __construct(
        private JsonHelper $jsonHelper,
        private SeederPath $path,
        private DestinationRepository $repository
    ) {
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $destinations = $this->jsonHelper->convertToCollection($this->path::DESTINATIONS)->all();
        $this->repository->createManyDestination($destinations);
    }
}
