<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Repository\Admin\AdminRepository;

class AdminManagementController extends Controller
{
    public function __construct(protected AdminRepository $repository){}
    public function index()
    {
        $admins = $this->repository->getAllAdminAccount();
        return Inertia::render('admin/user/admin/AdminManagement', compact('admins'));
    }
}
