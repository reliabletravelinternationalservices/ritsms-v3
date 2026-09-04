<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property string $name
 * @property string $iso2
 * @property string $iso3
 * @property string $phone_code
 * @property string|null $flag
 * @property bool $is_active
 */
class Country extends Model
{
    use SoftDeletes;
    protected $table = 'countries';

    protected $fillable = [
        'name',
        'iso2',
        'iso3',
        'phone_code',
        'flag',
        'is_active',
    ];


    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }


    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    
    public function departures(): HasMany
    {
        return $this->hasMany(
            TourRoute::class,
            'departure_country_id',
            'id'
        );
    }

    public function destinations(): HasMany
    {
        return $this->hasMany(
            TourRoute::class,
            'destination_country_id',
            'id'
        );
    }
}
