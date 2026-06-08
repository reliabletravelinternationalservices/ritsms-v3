<?php

namespace App\Models;

use Database\Factories\DestinationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    /** @use HasFactory<DestinationFactory> */
    use HasFactory;

    protected $table = 'destinations';

    protected $fillable = [
        'title',
        'description',
        'country',
        'tag',
    ];

    // Relationship
    public function image()
    {
        return $this->morphOne(Media::class, 'mediable');
    }

    public function locations()
    {
        return $this->hasMany(DestinationLocation::class, 'destination_id')
            ->orderBy('updated_at', 'desc');
    }
}
