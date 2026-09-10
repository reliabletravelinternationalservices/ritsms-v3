<?php

namespace App\Services\Auth;

use App\Exceptions\Service\ServerErrorException;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginService
{
    public function authenticate(
        array $credentials,
        bool $remember = false
    ): void {

        try {

            $this->ensureIsNotRateLimited(
                $credentials['email']
            );


            if (!Auth::attempt(
                $credentials,
                $remember
            )) {

                RateLimiter::hit(
                    $this->throttleKey($credentials['email'])
                );


                throw ValidationException::withMessages([
                    'email' => trans('auth.failed'),
                ]);
            }


            RateLimiter::clear(
                $this->throttleKey($credentials['email'])
            );
        } catch (ValidationException $e) {

            // Keep Laravel validation errors
            throw $e;
        } catch (\Throwable $e) {

            // Log real error
            report($e);

            throw new ServerErrorException();
        }
    }



    protected function ensureIsNotRateLimited(
        string $email
    ): void {

        $key = $this->throttleKey($email);


        if (!RateLimiter::tooManyAttempts($key, 5)) {
            return;
        }


        event(new Lockout(request()));


        $seconds = RateLimiter::availableIn($key);


        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }



    protected function throttleKey(
        string $email
    ): string {

        return Str::transliterate(
            Str::lower($email)
                . '|'
                . request()->ip()
        );
    }
}
