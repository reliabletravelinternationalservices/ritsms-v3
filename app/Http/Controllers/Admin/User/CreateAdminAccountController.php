<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\AdminAccountRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repository\Admin\AdminRepository;

class CreateAdminAccountController extends Controller
{
    public function __construct(protected AdminRepository $repository){}
    public function index()
    {
        return Inertia::render('admin/user/admin/CreateAdminAccount');
    }

    public function store(AdminAccountRequest $request)
    {
        $this->repository->createAdminAccount($request->all());
        return redirect()->route('admin.users.admins')->with('success', 'Admin account created successfully.');
    }
}
