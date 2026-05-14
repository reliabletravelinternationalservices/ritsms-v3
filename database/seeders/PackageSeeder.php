<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Package\PackageRepository;
use App\Static\SeederPath;
use Database\Data\PackageData;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function __construct(protected PackageRepository $repository) {}

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = include database_path('data/packages.php');

        $packages = collect($packages)
            ->map(function ($package) {
                $package['highlights'] = parse_textarea($package['highlights']);
                $package['inclusions'] = parse_textarea($package['inclusions']);
                $package['exclusions'] = parse_textarea($package['exclusions']);
                $package['notes'] = parse_textarea($package['notes']);
                $package['itineraries'] = parse_itineraries($package['itineraries']);
                return $package;
            })
            ->all();


        $this->repository->createManyPackage($packages);
    }
    

}
