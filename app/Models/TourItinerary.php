<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourItinerary extends Model
{
    protected $table = 'tour_itineraries';

    protected $fillable = [
        'tour_id',
        'day_no',
        'title',
        'description',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
