<?php

namespace App\Concerns\Package;

//         'base_price' => ['required', 'numeric'],
//         'down_payment' => ['nullable', 'numeric'],
//         'duration' => ['required', 'integer'],
//         'selling_start_date' => ['nullable', 'date'],
//         'selling_end_date' => ['required', 'date'],
//         'description' => ['required', 'string'],
//         'highlights' => ['nullable', 'string'],
//         'itineraries' => ['required', 'array'],
//         'inclusions' => ['required', 'string'],
//         'exclusions' => ['required', 'string'],
//         'notes' => ['nullable', 'string'],
//         'destination' => ['required', 'string'],
//         'season' => ['required', 'string'],
//         'is_foreign_only' => ['required', 'boolean'],
trait CreatePackageValidationRules
{
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    protected function tagRules(): array
    {
        return ['string', 'nullable', 'max:155'];
    }

    protected function basePriceRules(): array
    {
        return ['required', 'numeric'];
    }

    protected function downPaymentRules(): array
    {
        return ['nullable', 'numeric'];
    }

    protected function durationRules(): array
    {
        return ['required', 'integer'];
    }

    protected function sellingStartDateRules(): array
    {
        return ['nullable', 'date'];
    }

    protected function sellingEndDateRules(): array
    {
        return ['required', 'date'];
    }

    protected function descriptionRules(): array
    {
        return ['required', 'string'];
    }

    protected function highlightsRules(): array
    {
        return ['required', 'string'];
    }

    protected function itinerariesRules(): array
    {
        return ['required', 'string'];
    }

    protected function inclusionsRules(): array
    {
        return ['required', 'string'];
    }

    protected function exclusionsRules(): array
    {
        return ['required', 'string'];
    }

    protected function notesRules(): array
    {
        return ['nullable', 'string'];
    }

    protected function destinationRules(): array
    {
        return ['required', 'string'];
    }

    protected function seasonRules(): array
    {
        return ['required', 'string'];
    }

    protected function isForeignOnlyRules(): array
    {
        return ['required', 'boolean'];
    }


    protected function customErrorMessages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',
            'tag.string' => 'The tag field must be a string.',
            'base_price.required' => 'The base price field is required.',
            'base_price.numeric' => 'The base price field must be a number.',
            'down_payment.numeric' => 'The down payment field must be a number.',
            'duration.required' => 'The duration field is required.',
            'duration.integer' => 'The duration field must be an integer.',
            'selling_start_date.date' => 'The selling start date field must be a date.',
            'selling_end_date.required' => 'The selling end date field is required.',
            'selling_end_date.date' => 'The selling end date field must be a date.',
            'description.required' => 'The description field is required.',
            'description.string' => 'The description field must be a string.',
            'highlights.string' => 'The highlights field must be a string.',
            'itineraries.required' => 'The itineraries field is required.',
            'itineraries.array' => 'The itineraries field must be an array.',
            'inclusions.required' => 'The inclusions field is required.',
            'inclusions.string' => 'The inclusions field must be a string.',
            'exclusions.required' => 'The exclusions field is required.',
            'exclusions.string' => 'The exclusions field must be a string.',
            'notes.string' => 'The notes field must be a string.',
            'destination.required' => 'The destination field is required.',
            'destination.string' => 'The destination field must be a string.',
            'season.required' => 'The season field is required.',
            'season.string' => 'The season field must be a string.',
        ];
    }

    protected function isAllowedToCreatePackage(): bool
    {
        return auth()->guard('web')->check();
    }
}
