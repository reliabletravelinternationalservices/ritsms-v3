<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AccountForgotPassword extends Controller
{
    public function forgotAdminPassword()
    {
        return Inertia::render('admin/auth/ForgotPassword');
    }

    public function sendAdminPasswordResetLink(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $validated['email'])->first();
        $user->sendAccountPasswordResetNotification();

        return redirect()->back()->with(['type' => 'success', 'message' => 'Password reset link sent to your email.']);
    }



    public function createAdminPasswordResetForm(Request $request, string $token)
    {
        return Inertia::render('admin/auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    public function resetAdminPassword(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $status = Password::reset(
            $validated,
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                ])->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return redirect()->route('admin.login')->with(['type' => 'success', 'message' => __($status)]);
        } else {
            return back()->withErrors(['email' => [__($status)]]);
        }
    }
}
