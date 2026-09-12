<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Package\PackageScheduleRepository;
use App\Static\SeederPath;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageScheduleSeeder extends Seeder
{
    public function __construct(
        protected SeederPath $path,
        protected JsonHelper $jsonHelper,
        protected PackageScheduleRepository $repository

    ) {}
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedules = $this->jsonHelper->convertToCollection($this->path::PACKAGE_SCHEDULES)->all();
        $this->repository->createManyPackageSchedule($schedules);
    }
}
