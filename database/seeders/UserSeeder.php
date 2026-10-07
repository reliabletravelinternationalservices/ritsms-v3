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
        $users = [
            [
                'code' => 'AD-20260421-02445',
                'name' => 'Reliable Info',
                'is_active' => true,
                'role' => 'admin',
                'email' => 'reliabletravelinfo@gmail.com',
                'password' => bcrypt('password'),
            ],
            [
                'code' => 'AD-20260421-02456',
                'name' => 'Reliable Dhel',
                'is_active' => true,
                'role' => 'agent',
                'email' => 'reliabledhel@gmail.com',
                'password' => bcrypt('password'),
            ],
            [
                'code' => 'AD-20260421-12344',
                'name' => 'Reliable Shy',
                'is_active' => true,
                'role' => 'agent',
                'email' => 'reliableshy@gmail.com',
                'password' => bcrypt('password'),
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
