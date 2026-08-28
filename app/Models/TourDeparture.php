<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;

class TourDeparture extends Model
{
    use SoftDeletes;

    protected $table = 'tour_departures';

    protected $fillable = [
        'tour_id',
        'base_price',
        'discounted_price',
        'min_pax',
        'max_pax',
        'departure_date',
        'return_date',
        'departure_flight_no',
        'return_flight_no',
        'airline_name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];


    // Relationships
    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function flights()
    {
        return $this->hasMany(DepartureFlight::class)
            ->orderBy('sequence');
    }
}
