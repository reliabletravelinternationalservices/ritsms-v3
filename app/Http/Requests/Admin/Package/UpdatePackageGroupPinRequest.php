<?php

namespace App\Http\Requests\Admin\Package;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePackageGroupPinRequest extends FormRequest
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
            'pinned_package_ids' => ['required', 'array'],
            'pinned_package_ids.*.package_id' => ['required', 'integer', 'exists:packages,id'],
            'pinned_package_ids.*.order_number' => ['required', 'integer'],
        ];
    }
}
