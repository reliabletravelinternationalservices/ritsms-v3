<?php

namespace App\Http\Requests\Admin\Package;

use App\Concerns\Package\CreatePackageValidationRules;
use App\Repository\Package\PackageRepository;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;


class CreatePackageRequest extends FormRequest
{
    use CreatePackageValidationRules;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->isAllowedToCreatePackage();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => $this->nameRules(),
            'description' => $this->descriptionRules(),
            'highlights' => $this->highlightsRules(),
            'itineraries' => $this->itinerariesRules(),
            'inclusions' => $this->inclusionsRules(),
            'exclusions' => $this->exclusionsRules(),
            'notes' => $this->notesRules(),
            'destination' => $this->destinationRules(),
            'season' => $this->seasonRules(),
            'is_foreign_only' => $this->isForeignOnlyRules(),
            'selling_start_date' => $this->sellingStartDateRules(),
            'selling_end_date' => $this->sellingEndDateRules(),
            'base_price' => $this->basePriceRules(),
            'down_payment' => $this->downPaymentRules(),
            'duration' => $this->durationRules(),
            'tag' => $this->tagRules(),
        ];
    }

    public function messages(): array
    {
        return $this->customErrorMessages();
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'highlights' => $this->highlights ? parse_textarea($this->highlights) : null,
            'inclusions' => $this->inclusions ? parse_textarea($this->inclusions) : null,
            'exclusions' => $this->exclusions ? parse_textarea($this->exclusions) : null,
            'itineraries' => $this->itineraries ? parse_itineraries($this->itineraries) : null,
            'notes' => $this->notes ? parse_textarea($this->notes) : null,
        ]);
    }

    protected function failedAuthorization()
    {
        throw new HttpException(
            403,
            'You are not allowed to create packages.'
        );
    }


}
