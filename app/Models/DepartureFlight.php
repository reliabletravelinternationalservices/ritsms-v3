<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DepartureFlight extends Model
{
    use SoftDeletes;
    protected $table = 'departure_flights';

    protected $fillable = [
        'tour_departure_id',
        'airline',
        'flight_number',
        'departure_airport',
        'arrival_airport',
        'departure_time',
        'arrival_time',
        'direction',
        'sequence',
    ];

    public function departure(): BelongsTo
    {
        return $this->belongsTo(TourDeparture::class);
    }
}
