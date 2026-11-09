<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData = [
            [
                'id' => 1,
                'code' => 'ADM-20260421-02445',
                'display_name' => 'Reliable Claire',
                'is_active' => true,
                'email' => 'reliabletravelinfo@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ],
            [
                'id' => 2,
                'display_name' => 'Reliable Dhel',
                'is_active' => true,
                'email' => 'reliabledhel@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'agent',
            ],
            [
                'id' => 3,
                'display_name' => 'John Doe',
                'is_active' => true,
                'email' => 'johndoe@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
            [
                'id' => 4,
                'display_name' => 'Jade Doe',
                'is_active' => true,
                'email' => 'jadedoe@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
            [
                'id' => 5,
                'display_name' => 'James Doe',
                'is_active' => true,
                'email' => 'jamesdoe@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
            [
                'id' => 6,
                'display_name' => 'Kim Doe',
                'is_active' => false,
                'email' => 'kimdoe@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
            [
                'id' => 7,
                'display_name' => 'Joel Gutlay',
                'is_active' => true,
                'email' => 'jo@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
            [
                'id' => 8,
                'display_name' => 'Kim Mendoza',
                'is_active' => true,
                'email' => 'kim@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
            [
                'id' => 9,
                'display_name' => 'Jenny Perez',
                'is_active' => true,
                'email' => 'jenny@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'client',
            ],
        ];

        DB::transaction(function () use ($userData) {
            foreach ($userData as $data) {
                User::create($data);
            }
        });
    }
}
