<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $table = 'destinations';
    
    protected $fillable = [
        'title',
        'description',
        'country',
        'tag',
    ];


    //Relationship
    public function image()
    {
        return $this->morphOne(Media::class, 'mediable');
    }

    public function locations()
    {
        return $this->hasMany(DestinationLocation::class, 'destination_id');
    }
}
