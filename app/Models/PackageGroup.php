<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PackageGroup extends Model
{
    protected $table = 'package_groups';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'description',
        'include_as_outbound',
        'include_as_inbound',
        'is_featured',
    ];

    protected $casts = [
        'include_as_outbound' => 'boolean',
        'include_as_inbound' => 'boolean',
    ];



    // Relationships
    public function packages()
    {
        return $this->belongsToMany(Package::class, 'package_groups_items', 'package_group_id', 'package_id')
            ->withPivot('order_number')
            ->orderBy('pivot_order_number');
    }
}
