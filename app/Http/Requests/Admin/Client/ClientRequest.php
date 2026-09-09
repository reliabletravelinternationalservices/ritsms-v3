<?php

namespace App\Http\Requests\Admin\Client;

use App\Enums\Client\Gender;
use App\Enums\Client\Source;
use App\Enums\Client\Status;
use App\Enums\Client\Type;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
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
                'max:100',
            ],

            'email' => [
                'required',
                'email',
                'max:100',
                Rule::unique('clients', 'email')->ignore($this->client),
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            'status' => [
                'required',
                Rule::enum(Status::class),
            ],

            'source' => [
                'required',
                Rule::enum(Source::class),
            ],

            'type' => [
                'required',
                Rule::enum(Type::class),
            ],

            'gender' => [
                'required',
                Rule::enum(Gender::class),
            ],

            'accept_marketing' => [
                'boolean',
            ],

            'website_link' => [
                'nullable',
                'url',
                'max:255',
            ],

            'facebook_link' => [
                'nullable',
                'url',
                'max:255',
            ],

            'last_contacted_at' => [
                'nullable',
                'date',
            ],

            'notes' => [
                'nullable',
                'string',
            ],
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [

            'name.required' => 'Client name is required.',
            'name.max' => 'Client name must not exceed 100 characters.',

            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Email address must not exceed 100 characters.',
            'email.unique' => 'This email address is already registered.',

            'phone.max' => 'Phone number must not exceed 20 characters.',

            'status.required' => 'Please select a client status.',
            'status.enum' => 'Please select a valid client status.',

            'source.required' => 'Please select how this client was acquired.',
            'source.enum' => 'Please select a valid client source.',

            'type.required' => 'Please select a client type.',
            'type.enum' => 'Please select a valid client type.',

            'gender.required' => 'Please select a gender.',
            'gender.enum' => 'Please select a valid gender.',

            'accept_marketing.boolean' => 'Marketing preference must be true or false.',

            'website_link.url' => 'Please enter a valid website URL.',
            'website_link.max' => 'Website URL must not exceed 255 characters.',

            'facebook_link.url' => 'Please enter a valid Facebook URL.',
            'facebook_link.max' => 'Facebook URL must not exceed 255 characters.',

            'last_contacted_at.date' => 'Please enter a valid contact date.',

            'notes.string' => 'Notes must be a valid text value.',
        ];
    }
}