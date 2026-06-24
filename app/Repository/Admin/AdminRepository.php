<?php

namespace App\Repository\Admin;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class AdminRepository
{
    public function getAllAdminAccount()
    {
        return User::orderBy('updated_at', 'desc')->get();
    }

    public function createAdminAccount(array $data)
    {
        return DB::transaction(function () use ($data) {
            return User::create($data);
        });
    }
}