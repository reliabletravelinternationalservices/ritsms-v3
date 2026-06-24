<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Repository\Admin\AdminRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAccountDetailController extends Controller
{
    public function __construct(protected AdminRepository $request){}
    public function index(int $id)
    {
        $admin = $this->request->getAdminAccountById($id);   
        return Inertia::render('admin/user/admin/AdminAccountDetail', compact('admin'));
    }
}
