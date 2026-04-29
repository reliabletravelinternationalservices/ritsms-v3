<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $table = 'packages';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'description',
        'base_price',
        'down_payment',
        'duration',
        'selling_start_date',
        'selling_end_date',
        'description',
        'highlights',
        'itineraries',
        'inclusions',
        'exclusions',
        'notes',
        'status',
    ];

    protected $casts = [
        'itineraries' => 'array',
        'inclusions' => 'array',
        'exclusions' => 'array',
        'notes' => 'array',
    ];


    public function schedules()
    {
        return $this->hasMany(PackageSchedule::class, 'package_id');
    }

}
