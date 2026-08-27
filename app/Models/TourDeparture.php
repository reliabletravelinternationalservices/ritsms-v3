<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        'is_active',
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
