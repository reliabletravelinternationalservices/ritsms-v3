<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountForgotPassword extends Controller
{
    public function forgotAdminPassword()
    {
        return inertia('admin/auth/ForgotPassword');
    }
}
