<?php

namespace App\Http\Requests\Admin\Package;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePackageImageRequest extends FormRequest
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
            'deleted_ids' => 'nullable|array',
            'deleted_ids.*' => 'integer',
            'meta' => 'nullable|array',
            'meta.*.id' => 'required_with:meta|integer',
            'meta.*.is_primary' => 'required_with:meta|boolean',
            'meta.*.order' => 'required_with:meta|integer',
        ];
    }
}
