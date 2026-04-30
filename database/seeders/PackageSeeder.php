<?php

namespace Database\Seeders;

use App\Helper\Json\JsonHelper;
use App\Models\Package;
use App\Repository\Package\PackageRepository;
use App\Static\SeederPath;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class PackageSeeder extends Seeder
{



    public function __construct(
        protected PackageRepository $repository,
        protected JsonHelper $jsonHelper,
        protected SeederPath $path
    ){}


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = $this->jsonHelper->convertToCollection($this->path::PACKAGES)->all();
        $this->repository->createManyPackage($packages);
    }

}
