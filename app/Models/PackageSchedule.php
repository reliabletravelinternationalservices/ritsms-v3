<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PackageSchedule extends Model
{
    protected $table = 'package_schedules';
    protected $primaryKey = 'id';

    public $timestamps = false;
    
    protected $fillable = [
        'package_id',
        'departure_date',
        'return_date',
        'price',
        'is_available',
        'is_limited',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id');
    }
}
