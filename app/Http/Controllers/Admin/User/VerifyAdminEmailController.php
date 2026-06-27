<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class VerifyAdminEmailController extends Controller
{
    public function send(Request $request)
    {


        $validated = $request->validate([
            'id' => ['required', 'exists:users,id'],
            'email' => ['required', 'email'],
        ]);


        $user = User::findOrFail($validated['id']);

        if (! hash_equals($user->email, $validated['email'])) {
            throw ValidationException::withMessages([
                'email' => 'The selected email does not match this account.',
            ]);
        }

        if ($user->hasVerifiedEmail()) {
            throw ValidationException::withMessages([
                'email' => 'Email is already verified.',
            ]);
        }

        $remainingSeconds = $user->adminVerificationCooldownRemainingSeconds();
        $toMinutes = round($remainingSeconds / 60);

        if ($remainingSeconds > 0) {
            throw ValidationException::withMessages([
                'email' => 'A verification email was already sent. Please wait for (' . $toMinutes . ' minutes) and try again later.',
            ]);
        }

        $user->sendEmailVerificationNotification();

        $expiresAt = now()->addMinutes(60);

        Cache::put($user->adminVerificationCooldownKey(), $expiresAt, $expiresAt);

        return back()->with('success', 'Verification email sent successfully.');
    }

    public function verify(Request $request, int $id, string $hash)
    {
        $user = User::findOrFail($id);

        // Invalid or expired signed URL
        if (! $request->hasValidSignature()) {
            return Inertia::render('verification/employee/EmployeeVerificationResult', [
                'email' => $user->email,
                'status' => 'expired',
            ]);
        }

        // Tampered hash
        if (! hash_equals($hash, sha1($user->getEmailForVerification()))) {
            abort(403);
        }

        // Already verified
        if ($user->hasVerifiedEmail()) {
            return Inertia::render('verification/employee/EmployeeVerificationResult', [
                'email' => $user->email,
                'status' => 'already_verified',
            ]);
        }

        // Verify email
        $user->markEmailAsVerified();

        // Activate account
        if ($user->status !== 'active') {
            $user->forceFill([
                'status' => 'active',
            ])->save();
        }

        return Inertia::render('verification/employee/EmployeeVerificationResult', [
            'email' => $user->email,
            'status' => 'success',
        ]);
    }
}
