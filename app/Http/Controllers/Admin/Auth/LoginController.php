<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Services\Auth\LoginService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class LoginController extends Controller
{
    public function __construct(
        protected LoginService $service
    ) {}


    public function login(): Response
    {
        return Inertia::render('admin/auth/Login');
    }


    public function store(LoginRequest $request): RedirectResponse
    {

        $this->service->authenticate(
            $request->validated(),
            $request->boolean('remember')
        );
        $request->session()->regenerate();
        return to_route('admin.dashboard');
    }
}
