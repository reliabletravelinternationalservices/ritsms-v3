<?php

namespace App\Repository\Admin;

use App\Models\User;

class AdminRepository
{
    public function getAllAdminAccount()
    {
        return User::orderBy('updated_at', 'desc')->get();
    }
}