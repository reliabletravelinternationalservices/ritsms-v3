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

    protected $casts = [
        'itineraries' => 'array',
        'notes' => 'array',
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

}
