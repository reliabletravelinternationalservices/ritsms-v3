<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourHotel extends Model
{
    use SoftDeletes;
    protected $table = 'tour_hotels';

    protected $fillable = [
        'tour_id',
        'name',
        'rate',
        'link',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
