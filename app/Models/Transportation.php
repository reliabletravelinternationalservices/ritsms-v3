<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transportation extends Model
{
    use SoftDeletes;
    protected $table = 'transportations';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active',
    ];



    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }



    // Relationships
    public function tours()
    {
        return $this->belongsToMany(Tour::class, 'tours_transportations', 'transportation_id', 'tour_id');
    }
}
