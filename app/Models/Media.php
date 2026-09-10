<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'mediable_id',
        'mediable_type',
        'collection',
        'file_name',
        'file_path',
        'disk',
        'type',
        'mime_type',
        'size',
        'alt_text',
        'order_number',
    ];

    protected function casts(): array
    {
        return [
            'size' => 'integer',
            'order_number' => 'integer',
        ];
    }

    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }
}