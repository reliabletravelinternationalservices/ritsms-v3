<?php

namespace App\Http\Requests\Admin\Destination;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DestinationLocationRequest extends FormRequest
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
            'description' => ['required', 'string'],
            'map_link' => ['nullable', 'url'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The location name is required.',
            'name.string' => 'The location name must be a string.',
            'name.max' => 'The location name may not be greater than 255 characters.',
            'description.required' => 'The location description is required.',
            'description.string' => 'The description must be a string.',
            'map_link.url' => 'The map link must be a valid URL.',
            'image.image' => 'The image must be a valid image file.',
            'image.mimes' => 'The image must be a JPEG, PNG, JPG, or WEBP file.',
        ];
    }
}
