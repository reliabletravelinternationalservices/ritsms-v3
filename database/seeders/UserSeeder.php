<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'display_name' => 'Developer Account',
            'role' => 'admin',
            'email' => 'reliabletravelinfo@gmail.com',
            'password' => bcrypt('reliable@password'),
        ]);
    }
}
