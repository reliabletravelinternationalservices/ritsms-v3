<?php

namespace App\Http\Requests\Admin\Quotation;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuotationRequest extends FormRequest
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
            // Client
            'client_id' => [
                'nullable',
                'integer',
                'exists:clients,id',
            ],
            'primary_client_name' => [
                'required',
                'string',
                'max:100',
            ],
            'primary_client_email' => [
                'required',
                'email',
                'max:150',
            ],
            'primary_client_phone' => [
                'required',
                'string',
                'max:30',
            ],

            // Quotation
            'code' => [
                'nullable',
                'string',
                'max:20',
                'unique:quotations,code',
            ],
            'slug' => [
                'nullable',
                'string',
                'max:100',
                'unique:quotations,slug',
            ],
            'status' => [
                'nullable',
                Rule::in([
                    'draft',
                    'sent',
                    'viewed',
                    'accepted',
                    'rejected',
                    'expired',
                    'cancelled',
                ]),
            ],
            'valid_until' => [
                'nullable',
                'date',
            ],

            // Tour
            'tour_id' => [
                'required',
                'integer',
                'exists:tours,id',
            ],
            'tour_name' => [
                'required',
                'string',
                'max:200',
            ],
            'tour_duration' => [
                'required',
                'integer',
                'min:1',
            ],
            'tour_departure_id' => [
                'nullable',
                'integer',
                'exists:tour_departures,id',
            ],

            // Travel dates
            'departure_date' => [
                'required',
                'date',
            ],
            'return_date' => [
                'required',
                'date',
                'after_or_equal:departure_date',
            ],
            'total_pax' => [
                'required',
                'integer',
                'min:1',
            ],

            // Pricing
            'subtotal' => [
                'required',
                'numeric',
                'min:0',
            ],
            'discount_total' => [
                'required',
                'numeric',
                'min:0',
            ],
            'tax_total' => [
                'required',
                'numeric',
                'min:0',
            ],
            'grand_total' => [
                'required',
                'numeric',
                'min:0',
            ],

            // Tracking
            'sent_at' => [
                'nullable',
                'date',
            ],
            'viewed_at' => [
                'nullable',
                'date',
            ],
            'accepted_at' => [
                'nullable',
                'date',
            ],

            // Notes
            'remarks' => [
                'nullable',
                'string',
            ],
            'notes' => [
                'nullable',
                'string',
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'client_id.exists' => 'The selected client does not exist.',

            'primary_client_name.required' => 'Primary client name is required.',
            'primary_client_email.required' => 'Primary client email is required.',
            'primary_client_email.email' => 'Please enter a valid client email address.',
            'primary_client_phone.required' => 'Primary client phone number is required.',

            'tour_id.required' => 'Please select a tour package.',
            'tour_id.exists' => 'The selected tour package does not exist.',

            'tour_name.required' => 'Tour name is required.',
            'tour_duration.required' => 'Tour duration is required.',
            'tour_duration.min' => 'Tour duration must be at least 1 day.',

            'tour_departure_id.exists' => 'The selected tour departure does not exist.',

            'departure_date.required' => 'Departure date is required.',
            'return_date.required' => 'Return date is required.',
            'return_date.after_or_equal' => 'Return date must be on or after the departure date.',

            'total_pax.required' => 'Number of passengers is required.',
            'total_pax.min' => 'At least 1 passenger is required.',

            'subtotal.required' => 'Subtotal is required.',
            'subtotal.min' => 'Subtotal cannot be negative.',

            'discount_total.required' => 'Discount is required.',
            'discount_total.min' => 'Discount cannot be negative.',

            'tax_total.required' => 'Tax is required.',
            'tax_total.min' => 'Tax cannot be negative.',

            'grand_total.required' => 'Grand total is required.',
            'grand_total.min' => 'Grand total cannot be negative.',

            'valid_until.date' => 'Please enter a valid quotation validity date.',
        ];
    }
}