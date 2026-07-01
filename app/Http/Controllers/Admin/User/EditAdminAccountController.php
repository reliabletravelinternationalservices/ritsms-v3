<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repository\Admin\AdminRepository;

class EditAdminAccountController extends Controller
{
    public function __construct(protected AdminRepository $repository) {}
    public function index(int $id)
    {
       
        $admin = $this->repository->getAdminAccountById($id);

        return inertia('admin/user/admin/EditAdminAccount', compact('admin'));
    }

    public function update(Request $request, int $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|in:admin,agent',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $this->repository->updateAdminAccount($id, $validatedData);

        return redirect()->route('admin.users.admins.details', ['id' => $id])
                         ->with('success', 'Admin account updated successfully.');
    }
}
