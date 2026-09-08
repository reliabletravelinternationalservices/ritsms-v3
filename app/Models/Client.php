<?php

namespace App\Models;

use App\Enums\Client\Gender;
use App\Enums\Client\Source;
use App\Enums\Client\Status;
use App\Enums\Client\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property Status|null $status
 * @property Source|null $source
 * @property Type|null $type
 * @property Gender|null $gender
 */
class Client extends Model
{
    use SoftDeletes;

    protected $table = 'clients';

    protected $fillable = [
        'code',
        'slug',
        'name',
        'email',
        'phone',
        'address',
        'type',
        'status',
        'source',
        'gender',
        'accept_marketing',
        'website_link',
        'facebook_link',
        'last_contacted_at',
        'notes',
    ];

    protected $casts = [
        'status' => Status::class,
        'source' => Source::class,
        'type' => Type::class,
        'gender' => Gender::class,
        'accept_marketing' => 'boolean',
        'last_contacted_at' => 'datetime',
    ];
}