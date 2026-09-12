<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingItem extends Model
{
    protected $table = 'booking_items';

    protected $fillable = [
        'booking_id',
        'package_snapshot',
        'price_snapshot',
        'total_person',
        'travel_date',
        'end_date',
        'notes'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }
}
