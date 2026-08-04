<?php

namespace App\Http\Requests\Admin\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'string',
                'email',
            ],

            'password' => [
                'required',
                'string',
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
        ];
    }
}
