<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeleteAdminAccountController extends Controller
{
    public function destroy(Request $request, int $id)
    {
        $user = User::find($id);
        if ($user && $user->avatar) {
            Storage::disk('public')->delete($user->avatar);
            $user->delete();
        }
        return redirect()->route('admin.users.admins')->with('success', 'Admin deleted successfully.');
    }
}
