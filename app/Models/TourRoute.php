<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourRoute extends Model
{
    use SoftDeletes;

    protected $table = 'tour_routes';

    protected $fillable = [
        'tour_id',
        'departure_country_id',
        'destination_country_id',
        'departure_city',
        'destination_city',
        'sequence',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function departureCountry(): BelongsTo
    {
        return $this->belongsTo(
            Country::class,
            'departure_country_id'
        );
    }

    public function destinationCountry(): BelongsTo
    {
        return $this->belongsTo(
            Country::class,
            'destination_country_id'
        );
    }
}