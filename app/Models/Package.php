<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


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
        'slug',
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
        return $this->morphMany(Media::class, 'mediable')
            ->orderBy('order_number', 'asc');
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

    public static function getDashboardMetrics(): array
    {
        $currentMonthCount = static::query()
            ->whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        $previousMonthCount = static::query()
            ->whereYear('created_at', now()->subMonth()->year)
            ->whereMonth('created_at', now()->subMonth()->month)
            ->count();

        $trendPercentage = match (true) {
            $previousMonthCount === 0 && $currentMonthCount > 0 => 100,
            $previousMonthCount === 0 => 0,
            default => round(
                (($currentMonthCount - $previousMonthCount) / $previousMonthCount) * 100,
                1
            ),
        };

        return [
            'total_packages' => static::count(),
            'packages_trend' => $trendPercentage,
            'average_price' => round(static::avg('base_price') ?? 0, 2),
            'foreign_exclusive_count' => static::where('is_foreign_only', true)->count(),
        ];
    }

    protected static function generateSlug(string $name, int|null $ignoreId = null)
    {
        $slug = Str::slug($name);

        $query = static::where('slug', 'like', "{$slug}%");

        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        $count = $query->count();

        return $count ? "{$slug}-" . ($count + 1) : $slug;
    }

    protected static function booted()
    {
        static::creating(function ($package) {
            $package->slug = static::generateSlug($package->name);
        });

        static::updating(function ($package) {
            if ($package->isDirty('name')) {
                $package->slug = static::generateSlug($package->name, $package->id);
            }
        });
    }
}
