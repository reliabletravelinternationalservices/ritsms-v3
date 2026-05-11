<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'display_name' => 'Tester',
            'role' => 'admin',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            PackageSeeder::class,
            PackageGroupSeeder::class,
            PackageGroupItemSeeder::class,
            SettingSeeder::class,
            PackageScheduleSeeder::class,
            DestinationSeeder::class,
            DestinationLocationSeeder::class
        ]);
    }
}
