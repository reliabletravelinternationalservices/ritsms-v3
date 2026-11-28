<?php

namespace App\Http\Requests\Api\Destination;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GetCountriesRequest extends FormRequest
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
            'countryName' => ['nullable', 'string', 'max:100'],
            'tag'         => ['nullable', 'string', 'max:100'],
            'page'        => ['nullable', 'integer', 'min:1'],
            'perPage'     => ['nullable', 'integer', 'min:1', 'max:100'],
            'with'            => ['nullable', 'array'],
            'with.locations'  => ['sometimes', 'boolean'],
        ];
    }
}
