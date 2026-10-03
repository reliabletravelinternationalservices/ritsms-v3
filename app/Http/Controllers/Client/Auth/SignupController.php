<?php

namespace App\Http\Controllers\Client\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Auth\SignupRequest;
use App\Models\Client;
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

        $client = Client::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'is_registered' => true,
        ]);

        Auth::guard('client')->login($client);

        $request->session()->regenerate();

        return redirect()->route('client.landing')->with('flash', [
            'message' => 'Welcome our client!',
            'type' => 'register',
        ]);
    }
}
