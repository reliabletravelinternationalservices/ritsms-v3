<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Repository\Admin\AdminRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAccountDetailController extends Controller
{
    public function __construct(protected AdminRepository $repository) {}

    public function index(int $id)
    {
        $admin = $this->repository->getAdminAccountById($id);

        return Inertia::render('admin/user/admin/AdminAccountDetail', [
            'admin' => $admin,
            'verificationCooldownSeconds' => $admin->adminVerificationCooldownRemainingSeconds(),
        ]);
    }



    public function update(Request $request, int $id)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);

        $this->repository->updateAdminAccountStatus($id, $request->status);

        return redirect()->route('admin.users.admins.details', ['id' => $id])
            ->with('success', 'Admin account has been updated successfully.');
    }
}
