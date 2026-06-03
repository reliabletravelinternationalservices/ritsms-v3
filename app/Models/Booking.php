<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'bookings';
    protected $guarded = ['id'];
    protected $fillable = [
        'client_id',
        'status',
        'source',
        'payment_status',
        'total_amount',
        'notes',
    ];


    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function bookingItems()
    {
        return $this->hasMany(BookingItem::class, 'booking_id', 'id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'booking_id', 'id');
    }

    public function refunds()
    {
        return $this->hasMany(Refund::class, 'booking_id', 'id');
    }
}
