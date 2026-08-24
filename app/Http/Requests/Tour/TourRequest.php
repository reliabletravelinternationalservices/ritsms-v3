<?php

namespace App\Http\Requests\Tour;

use App\Concerns\Tour\TourValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Override;

class TourRequest extends FormRequest
{
    use TourValidationRules;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $data = [];

        if ($this->has('overview')) {
            $data['overview'] = json_decode(
                $this->input('overview'),
                true
            );
        }

        if ($this->has('itineraries')) {
            $data['itineraries'] = json_decode(
                $this->input('itineraries'),
                true
            );
        }

        $this->merge($data);
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            // OVERVIEW
            ...$this->overviewRules(),

            // ITINERARIES
            ...$this->itineraryRules(),
        ];
    }

    public  function messages():  array
    {
        return [
            ...$this->overviewErrorMessages(),
            ...$this->itineraryErrorMessages(),
        ];
    }
        
}
