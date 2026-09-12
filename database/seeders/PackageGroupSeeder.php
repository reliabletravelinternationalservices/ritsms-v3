<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Package\PackageGroupRepository;
use App\Static\SeederPath;
use Illuminate\Database\Seeder;

class PackageGroupSeeder extends Seeder
{
    public function __construct(private JsonHelper $jsonHelper, private SeederPath $path, private PackageGroupRepository $repository) {}

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = $this->jsonHelper->convertToCollection($this->path::PACKAGE_GROUPS)->all();
        $this->repository->createManyGroup($groups);
    }
}
