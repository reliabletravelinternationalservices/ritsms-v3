<?php

namespace App\Http\Controllers\Client\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $remember = $validatedData['remember'] ?? false;

        if (!Auth::guard('client')->attempt(
            [
                'email' => $validatedData['email'],
                'password' => $validatedData['password'],
            ],
            $remember
        )) {
            return back()->withErrors([
                'email' => 'The email or password is incorrect.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->route('client.landing')->with('flash', [
            'message' => 'Welcome back!',
            'type' => 'login',
        ]);
    }
}
