<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class AdminAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('web')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
   public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'display_name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'in:admin,agent'], // Fixed 'only' to 'in'
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field may not be greater than 255 characters.',
            'email.required' => 'The email field is required.',
            'email.string' => 'The email field must be a string.',
            'email.email' => 'The email field must be a valid email address.',
            'email.max' => 'The email field may not be greater than 255 characters.',
            'password.required' => 'The password field is required.',
            'password.string' => 'The password field must be a string.',
            'password.min' => 'The password field must be at least 8 characters.',
            'display_name.required' => 'The display name field is required.',
            'display_name.string' => 'The display name field must be a string.',
            'display_name.max' => 'The display name field may not be greater than 255 characters.',
            'role.required' => 'The role field is required.',
            'role.string' => 'The role field must be a string.',
            'role.in' => 'The role field must be admin or agent.', // Fixed 'role.only' to 'role.in'
            'avatar.image' => 'The uploaded file must be an image.',
            'avatar.mimes' => 'The uploaded file must be a JPEG, PNG, JPG, or WEBP image.',
        ];
    }
}
