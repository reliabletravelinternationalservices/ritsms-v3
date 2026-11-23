<?php

namespace App\Http\Controllers\Client\Auth;

use App\Enums\User\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    public function signup()
    {
        return  Inertia::render('client/auth/Signup');
    }

    public function store(SignupRequest $request)
    {
        $validatedData = $request->validated();

        $user = User::create([
            'display_name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => Role::CLIENT,
            'is_active' => true,
        ]);

        Auth::guard('web')->login($user);

        $request->session()->regenerate();

        return redirect()->route('client.landing')->with('flash', [
            'message' => 'Welcome our client!',
            'type' => 'register',
        ]);
    }
}