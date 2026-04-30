<?php

namespace Database\Seeders;

use App\Helper\Json\JsonHelper;
use App\Repository\Package\PackageGroupRepository;
use App\Static\SeederPath;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageGroupItemSeeder extends Seeder
{
    public function __construct(
        protected JsonHelper $jsonHelper,
        protected SeederPath $path,
        protected PackageGroupRepository $repository
    ){}
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = $this->jsonHelper->convertToCollection($this->path::PACKAGE_GROUP_ITEMS)->all();
        $this->repository->addManyGroupItem($items);
    }
}
