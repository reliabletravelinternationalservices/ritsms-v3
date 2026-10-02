<?php

namespace App\Http\Controllers\Client\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\LoginRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function login()
    {
        return Inertia::render('client/auth/Login');
    }


    public function store(LoginRequest $request)
    {
        $validatedData = $request->validated();
        return;
    } 
}
