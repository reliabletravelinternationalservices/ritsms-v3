<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PackageGroup extends Model
{
    protected $table = 'package_groups';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'description',
        'tag',
        'include_as_outbound',
        'include_as_inbound',
        'is_featured',
        'slug',
    ];

    protected $casts = [
        'include_as_outbound' => 'boolean',
        'include_as_inbound' => 'boolean',
        'is_featured' => 'boolean',
    ];



    // Relationships
    public function packages()
    {
        return $this->belongsToMany(Package::class, 'package_groups_items', 'package_group_id', 'package_id')
            ->withPivot('order_number')
            ->orderBy('pivot_order_number');
    }


    public function image()
    {
        return $this->morphOne(Media::class, 'mediable');
    }



    protected static function booted()
    {
        static::creating(function ($group) {
            do {
                $base = Str::limit(Str::slug($group->title), 50, '');
                $slug = "{$base}-" . Str::lower(Str::random(6));
            } while (static::where('slug', $slug)->exists());

            $group->slug = $slug;
        });


        static::updating(function ($group) {
            if ($group->isDirty('title')) {
                do {
                    $base = Str::limit(Str::slug($group->title), 50, '');
                    $slug = "{$base}-" . Str::lower(Str::random(6));
                } while (static::where('slug', $slug)
                    ->where('id', '!=', $group->id)
                    ->exists());

                $group->slug = $slug;
            }
        });
    }
}
