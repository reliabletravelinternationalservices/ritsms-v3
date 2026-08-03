<?php

namespace App\Models;

use App\Enums\Tour\Category;
use App\Enums\Tour\ItineraryType;
use App\Enums\Tour\State;
use App\Enums\Tour\TourType;
use App\Enums\Tour\Visibility;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property Category $category
 * @property ItineraryType $itinerary_type
 * @property TourType $tour_type
 * @property State $state
 * @property Visibility $visibility
 * @property array $highlights
 * @property array $inclusions
 * @property array|null $exclusions
 * @property array $description
 * @property array $terms_and_conditions
 */


class Tour extends Model
{
    use SoftDeletes;

    protected $table = 'tours';

    protected $fillable = [
        'code',
        'slug',
        'name',
        'category',
        'itinerary_type',
        'tour_type',
        'state',
        'visibility',
        'duration',
        'highlights',
        'inclusions',
        'exclusions',
        'terms_and_conditions',
        'description',
        'badge',
        'notes',
    ];


    protected function casts(): array
    {
        return [
            'category' => Category::class,
            'itinerary_type' => ItineraryType::class,
            'tour_type' => TourType::class,
            'state' => State::class,
            'visibility' => Visibility::class,

            'highlights' => 'array',
            'inclusions' => 'array',
            'exclusions' => 'array',

            'description' => 'array',
            'terms_and_conditions' => 'array',
        ];
    }
}
