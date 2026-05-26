<?php

namespace App\Http\Requests\Admin\Destination;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateDestinationRequest extends FormRequest
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
            'title' => 'required|string',
            'country' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
            'tag' => 'nullable|string',
            'remove_image' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The destination title is required.',
            'country.required' => 'The country field is required.',
            'description.required' => 'The description field is required.',
            'image.image' => 'The uploaded file must be an image.',
            'tag.string' => 'The tag field must be a string.',
        ];
    }
}
