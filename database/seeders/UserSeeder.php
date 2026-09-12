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
        User::create([
            'code' => 'ADM-20260421-02445',
            'display_name' => 'Reliable Info',
            'is_active' => true,
            'email' => 'reliabletravelinfo@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
