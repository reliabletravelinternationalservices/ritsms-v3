<?php

namespace Database\Seeders;

use App\Helpers\Json\JsonHelper;
use App\Repository\Setting\SettingRepository;
use App\Static\SeederPath;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function __construct(protected JsonHelper $jsonHelper, protected SeederPath $path, protected SettingRepository $repository) {}

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = $this->jsonHelper->convertToCollection($this->path::SETTINGS)->all();
        $this->repository->createManySettings($settings);
    }
}
