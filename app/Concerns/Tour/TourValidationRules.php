<?php

namespace App\Concerns\Tour;

trait TourValidationRules
{

    /*
    |
    |  OVERVIEW RULES
    |
    */
    protected function overviewRules(): array
    {
        return [
            'overview' => [
                'required',
                'array',
            ],

            'overview.name' => [
                'required',
                'string',
                'max:120',
            ],

            'overview.badge' => [
                'nullable',
                'string',
                'max:100',
            ],

            'overview.description' => [
                'required',
                'string',
                'max:225',
            ],

            'overview.highlights' => [
                'required',
                'string',
            ],

            'overview.inclusions' => [
                'required',
                'string',
            ],

            'overview.exclusions' => [
                'nullable',
                'string',
            ],

            'overview.terms_and_conditions' => [
                'required',
                'string',
            ],

            'overview.category' => [
                'required',
                'in:domestic,inbound,outbound',
            ],

            'overview.duration' => [
                'required',
                'integer',
                'min:1',
            ],

            'overview.itinerary_type' => [
                'required',
                'in:round_trip,tri_city,multi_city,one_way',
            ],

            'overview.booking_deadline' => [
                'nullable',
                'date',
            ],
        ];
    }

    protected function overviewErrorMessages(): array
    {
        return [
            // Overview
            'overview.required' => 'Tour overview is required.',
            'overview.array' => 'Tour overview must be a valid section.',

            // Name
            'overview.name.required' => 'Tour name is required.',
            'overview.name.string' => 'Tour name must be a valid text.',
            'overview.name.max' => 'Tour name may not exceed 120 characters.',

            // Badge
            'overview.badge.string' => 'Badge must be a valid text.',
            'overview.badge.max' => 'Badge may not exceed 100 characters.',

            // Description
            'overview.description.required' => 'Tour description is required.',
            'overview.description.string' => 'Tour description must be a valid text.',
            'overview.description.max' => 'Tour description may not exceed 225 characters.',

            // Highlights
            'overview.highlights.required' => 'Tour highlights are required.',
            'overview.highlights.string' => 'Tour highlights must be a valid text.',

            // Inclusions
            'overview.inclusions.required' => 'Tour inclusions are required.',
            'overview.inclusions.string' => 'Tour inclusions must be a valid text.',

            // Exclusions
            'overview.exclusions.string' => 'Tour exclusions must be a valid text.',

            // Terms
            'overview.terms_and_conditions.required' => 'Terms and conditions are required.',
            'overview.terms_and_conditions.string' => 'Terms and conditions must be a valid text.',

            // Category
            'overview.category.required' => 'Tour category is required.',
            'overview.category.in' => 'Please select a valid tour category.',

            // Duration
            'overview.duration.required' => 'Tour duration is required.',
            'overview.duration.integer' => 'Tour duration must be a valid number of days.',
            'overview.duration.min' => 'Tour duration must be at least 1 day.',

            // Itinerary type
            'overview.itinerary_type.required' => 'Itinerary type is required.',
            'overview.itinerary_type.in' => 'Please select a valid itinerary type.',

            'overview.booking_deadline.date' => 'Booking deadline must be a date.',

        ];
    }


    /*
    |
    |  ITINERARY RULES
    |
    */
    protected function itineraryRules(): array
    {
        return [
            'itineraries' => [
                'nullable',
                'array',
            ],

            'itineraries.*.day_no' => [
                'required',
                'integer',
                'min:1',
            ],

            'itineraries.*.title' => [
                'required',
                'string',
                'max:120',
            ],

            'itineraries.*.activities' => [
                'nullable',
                'string',
            ],
        ];
    }

    protected function itineraryErrorMessages(): array
    {
        return [
            // Itineraries
            'itineraries.array' => 'Itineraries must be a valid list.',

            // Day number
            'itineraries.*.day_no.required' => 'Day number is required.',
            'itineraries.*.day_no.integer' => 'Day number must be a valid number.',
            'itineraries.*.day_no.min' => 'Day number must be at least 1.',

            // Title
            'itineraries.*.title.required' => 'Itinerary title is required.',
            'itineraries.*.title.string' => 'Itinerary title must be valid text.',
            'itineraries.*.title.max' => 'Itinerary title may not exceed 120 characters.',

            // Activities
            'itineraries.*.activities.string' => 'Activities must be valid text.',
        ];
    }


    /*
    |
    |  ROUTES RULES
    |
    */
    protected function routesRules(): array
    {
        return [
            'routes' => [
                'nullable',
                'array',
            ],

            'routes.*.departure_country_id' => [
                'required',
                'integer',
                'exists:countries,id',
            ],

            'routes.*.destination_country_id' => [
                'required',
                'integer',
                'exists:countries,id',
            ],

            'routes.*.departure_city' => [
                'required',
                'string',
                'max:120',
            ],

            'routes.*.destination_city' => [
                'required',
                'string',
                'max:120',
            ],
            'routes.*.sequence' =>  [
                'required',
                'integer',
            ]
        ];
    }

    protected function routesErrorMessages(): array
    {
        return [
            'routes.array' =>
                'Routes must be a valid list.',

            'routes.*.departure_country_id.required' =>
                'Departure country is required.',

            'routes.*.departure_country_id.integer' =>
                'Departure country is invalid.',

            'routes.*.departure_country_id.exists' =>
                'The selected departure country does not exist.',

            'routes.*.destination_country_id.required' =>
                'Destination country is required.',

            'routes.*.destination_country_id.integer' =>
                'Destination country is invalid.',

            'routes.*.destination_country_id.exists' =>
                'The selected destination country does not exist.',

            'routes.*.departure_city.required' =>
                'Departure city is required.',

            'routes.*.departure_city.string' =>
                'Departure city must be a valid text.',

            'routes.*.departure_city.max' =>
                'Departure city may not exceed 120 characters.',

            'routes.*.destination_city.required' =>
                'Destination city is required.',

            'routes.*.destination_city.string' =>
                'Destination city must be a valid text.',

            'routes.*.destination_city.max' =>
                'Destination city may not exceed 120 characters.',

            'routes.*.sequence.required' => 'Route sequence is required.',

            'routes.*.sequence.integer' => 'Route sequence is invalid.'
        ];
    }


    protected function hotelRules(): array
    {
        return [
            'hotels' => ['nullable', 'array'],

            'hotels.*.name' => [
                'required',
                'string',
                'max:150',
            ],

            'hotels.*.rate' => [
                'required',
                'numeric',
                'min:0',
            ],

            'hotels.*.link' => [
                'nullable',
                'url',
                'max:500',
            ],
        ];
    }

    protected function hotelMessages(): array
    {
        return [
            'hotels.array' => 'Hotels must be a valid list.',

            'hotels.*.name.required' => 'Hotel name is required.',
            'hotels.*.name.string' => 'Hotel name must be a valid text.',
            'hotels.*.name.max' => 'Hotel name may not exceed 150 characters.',

            'hotels.*.rate.required' => 'Hotel rate is required.',
            'hotels.*.rate.numeric' => 'Hotel rate must be a valid number.',
            'hotels.*.rate.min' => 'Hotel rate must be at least 0.',

            'hotels.*.link.url' => 'Hotel link must be a valid URL.',
            'hotels.*.link.max' => 'Hotel link may not exceed 500 characters.',
        ];
    }

    protected  function scheduleRules()
    {
        return [
            'schedules' => ['nullable', 'array'],

            'schedules.*.base_price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'schedules.*.discounted_price' => [
                'nullable',
                'numeric',
                'min:0',
                'lt:schedules.*.base_price',
            ],

            'schedules.*.min_pax' => [
                'required',
                'integer',
                'min:1',
            ],

            'schedules.*.max_pax' => [
                'nullable',
                'integer',
                'gte:schedules.*.min_pax',
            ],

            'schedules.*.departure_date' => [
                'required',
                'date',
            ],

            'schedules.*.return_date' => [
                'required',
                'date',
                'after_or_equal:schedules.*.departure_date',
            ],

            'schedules.*.airline_name' => [
                'required',
                'string',
            ],

            'schedules.*.departure_flight_no' => [
                'required',
                'string',
            ],

            'schedules.*.return_flight_no' => [
                'required',
                'string',
            ],

            'schedules.*.is_active' => [
                'nullable',
                'boolean',
            ],
        ];
    }

    protected function scheduleMessages(): array
    {
        return [
            'schedules.array' => 'Schedules must be a valid list.',

            'schedules.*.base_price.required' => 'Base price is required.',
            'schedules.*.base_price.numeric' => 'Base price must be a number.',
            'schedules.*.base_price.min' => 'Base price cannot be negative.',

            'schedules.*.discounted_price.numeric' => 'Discounted price must be a number.',
            'schedules.*.discounted_price.min' => 'Discounted price cannot be negative.',
            'schedules.*.discounted_price.lt' => 'Discounted price must be lower than the base price.',

            'schedules.*.min_pax.required' => 'Minimum number of passengers is required.',
            'schedules.*.min_pax.integer' => 'Minimum number of passengers must be a whole number.',
            'schedules.*.min_pax.min' => 'Minimum number of passengers must be at least 1.',

            'schedules.*.max_pax.integer' => 'Maximum number of passengers must be a whole number.',
            'schedules.*.max_pax.gte' => 'Maximum number of passengers must be greater than or equal to the minimum number of passengers.',

            'schedules.*.departure_date.required' => 'Departure date is required.',
            'schedules.*.departure_date.date' => 'Departure date must be a valid date.',

            'schedules.*.return_date.required' => 'Return date is required.',
            'schedules.*.return_date.date' => 'Return date must be a valid date.',
            'schedules.*.return_date.after_or_equal' => 'Return date must be on or after the departure date.',

            'schedules.*.is_active.boolean' => 'Status must be true or false.',

            'schedules.*.airline_name.required' => 'Airline name is required.',
            'schedules.*.airline_name.string' => 'Airline name must be a valid text.',

            'schedules.*.departure_flight_no.required' => 'Departure flight number is required.',
            'schedules.*.departure_flight_no.date' => 'Departure flight number must be a date.',

            'schedules.*.return_flight_no.required' => 'Return flight number is required.',
            'schedules.*.return_flight_no.date' => 'Return flight number must be a date.',
        ];
    }
}