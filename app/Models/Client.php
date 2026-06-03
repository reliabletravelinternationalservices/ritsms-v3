<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';
    protected $primaryKey = 'id';
    protected $fillable = [
        'fullname',
        'email',
        'phone',
    ];



    public function bookings()
    {
        return $this->hasMany(Booking::class, 'client_id', 'id');
    }
}
