<?php

namespace App\Models;

use App\Enums\Tour\Category;
use App\Enums\Tour\ItineraryType;
use App\Enums\Tour\State;
use App\Enums\Tour\TourType;
use App\Enums\Tour\Visibility;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

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


    // Relationships
    public function transportations(): BelongsToMany
    {
        return $this->belongsToMany(Transportation::class, 'tours_transportations');
    }

    public function routes(): BelongsToMany
    {
        return $this->belongsToMany(TourRoute::class)
            ->orderBy('sequence');
    }

    public function departures()
    {
        return $this->hasMany(TourDeparture::class);
    }



    public function itineraries()
    {
        return $this->hasMany(TourItinerary::class)
            ->orderBy('day_no');
    }


    public function hotels()
    {
        return $this->hasMany(TourHotel::class);
    }


    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(
            TourGroup::class,
            'tour_group_items'
        )->withPivot('sort_order')
            ->orderByPivot('sort_order');
    }




    // other
    public function generateSlug(): string
    {
        $baseSlug = Str::limit(
            Str::slug($this->name),
            20,
            ''
        );

        $slug = $baseSlug;
        $counter = 2;

        while (
            static::where('slug', $slug)
                ->where('id', '!=', $this->id)
                ->exists()
        ) {
            $suffix = "-{$counter}";
            $slug = Str::limit(
                $baseSlug,
                20 - strlen($suffix),
                ''
            ) . $suffix;

            $counter++;
        }

        return $slug;
    }

    public function generateCode(): string
    {
        do {
            $code = 'TR-' . now()->format('Ymd') . '-' . random_int(1000, 9999);
        } while (self::where('code', $code)->exists());

        return $code;
    }



    protected static function booted(): void
    {
        static::creating(function (Tour $tour) {
            $tour->code = $tour->generateCode();
            $tour->slug = $tour->generateSlug();
        });
        
    }
}
