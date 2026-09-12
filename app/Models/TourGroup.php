<?php

namespace App\Models;

use App\Enums\Tour\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;


class TourGroup extends Model
{
    use SoftDeletes;
    protected $table = 'tour_groups';

    protected $fillable = [
        'slug',
        'title',
        'description',
        'badge',
        'category',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'category' => Category::class,
        'is_active' => 'boolean',
    ];


    // Relationships
    public function tours(): BelongsToMany
    {
        return $this->belongsToMany(
            Tour::class,
            'tour_group_items'
        )->withPivot('sort_order')
            ->orderByPivot('sort_order');
    }
}
