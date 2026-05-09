<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DestinationLocation extends Model
{
    protected $table = 'destination_locations';

    protected $fillable = [
        'destination_id',
        'name',
        'description',
        'map_link',
    ];



    //Relationships
    public function destination()
    {
        return $this->belongsTo(Destination::class, 'destination_id');
    }
}
