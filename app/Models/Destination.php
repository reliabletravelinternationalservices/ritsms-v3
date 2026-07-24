<?php

namespace App\Models;

use Database\Factories\DestinationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'slug',
    ];

    // Relationship
    public function image()
    {
        return $this->morphOne(Media::class, 'mediable');
    }

    public function locations()
    {
        return $this->hasMany(DestinationLocation::class, 'destination_id')
            ->orderBy('created_at', 'desc');
    }


    protected static function booted()
    {
        static::creating(function ($destination) {
            do {
                $base = Str::limit(Str::slug($destination->country), 50, '');
                $slug = "{$base}-" . Str::lower(Str::random(6));
            } while (static::where('slug', $slug)->exists());

            $destination->slug = $slug;
        });


        static::updating(function ($destination) {
            if ($destination->isDirty('country')) {
                do {
                    $base = Str::limit(Str::slug($destination->country), 50, '');
                    $slug = "{$base}-" . Str::lower(Str::random(6));
                } while (static::where('slug', $slug)
                    ->where('id', '!=', $destination->id)
                    ->exists());

                $destination->slug = $slug;
            }
        });
    }
}
