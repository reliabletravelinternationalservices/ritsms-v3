<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';
    protected $primaryKey = 'id';

    protected $fillable = [
        'mediable_id',
        'mediable_type',
        'file_name',
        'file_path',
        'url',
        'disk',
        'type',
        'mime_type',
        'size',
        'alt_text',
        'order_number',
        'is_primary',
    ];

    public function mediable()
    {
        return $this->morphTo();
    }
}
