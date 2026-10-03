<?php

namespace App\Http\Requests\Client\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('clients', 'email'),
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'same:password_confirm',
            ],

            'password_confirm' => [
                'required',
                'string',
                'min:8',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'name.string' => 'The name must be a valid text.',
            'name.min' => 'The name must be at least 2 characters.',
            'name.max' => 'The name must not exceed 255 characters.',

            'email.required' => 'Please enter your email address.',
            'email.string' => 'The email must be a valid text.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'The email address must not exceed 255 characters.',
            'email.unique' => 'This email address is already registered.',

            'password.required' => 'Please enter a password.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.same' => 'The password confirmation does not match.',

            'password_confirm.required' => 'Please confirm your password.',
            'password_confirm.min' => 'The password confirmation must be at least 8 characters.',
        ];
    }
}