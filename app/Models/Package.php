<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $table = 'packages';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'tag',
        'description',
        'base_price',
        'down_payment',
        'duration',
        'selling_start_date',
        'selling_end_date',
        'highlights',
        'itineraries',
        'inclusions',
        'exclusions',
        'notes',
        'destination',
        'season',
        'is_foreign_only',
    ];

    protected $appends = [
        'highlights_array',
        'itineraries_array',
        'inclusions_array',
        'exclusions_array',
        'notes_array',
    ];


    // Relationships
    public function packageGroups()
    {
        return $this->belongsToMany(PackageGroup::class, 'package_groups_items', 'package_id', 'package_group_id')
            ->withPivot('order_number')
            ->orderBy('pivot_order_number');
    }

    public function schedules()
    {
        return $this->hasMany(PackageSchedule::class, 'package_id');
    }

    public function images()
    {
        return $this->morphMany(Media::class, 'mediable');
    }



    // SHORTCUTS
    public function primaryImage()
    {
        return $this->morphOne(Media::class, 'mediable')->where('is_primary', true);
    }

    public function getHighlightsArrayAttribute()
    {
        return parse_json_array($this->attributes['highlights'] ?? '');
    }

    public function getItinerariesArrayAttribute()
    {
        return parse_json_block($this->attributes['itineraries'] ?? '');
    }

    public function getInclusionsArrayAttribute()
    {
        return parse_json_array($this->attributes['inclusions'] ?? '');
    }

    public function getExclusionsArrayAttribute()
    {
        return parse_json_array($this->attributes['exclusions'] ?? '');
    }

    public function getNotesArrayAttribute()
    {
        return parse_json_array($this->attributes['notes'] ?? '');
    }

}
