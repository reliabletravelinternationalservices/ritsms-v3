<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Package\PackageRepository;
use App\Static\SeederPath;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function __construct(
        protected PackageRepository $repository,
        protected JsonHelper $jsonHelper,
        protected SeederPath $path
    ) {}

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = $this->jsonHelper
            ->convertToCollection($this->path::PACKAGES)
            ->map(function ($package) {

                $package['highlights'] = build_text_block($package['highlights'] ?? []);
                $package['inclusions'] = build_text_block($package['inclusions'] ?? []);
                $package['exclusions'] = build_text_block($package['exclusions'] ?? []);
                $package['notes'] = build_text_block($package['notes'] ?? []);
                $package['itineraries'] = build_json_block($package['itineraries'] ?? []);

                return $package;
            })
            ->all();


        $this->repository->createManyPackage($packages);
    }
    

}
