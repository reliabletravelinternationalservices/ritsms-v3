<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    protected $table = 'social_accounts';
    protected $fillable = [
        'traveler_id',
        'provider_name',
        'provider_id',
    ];

    public function traveler()
    {
        return $this->belongsTo(Traveler::class, 'traveler_id', 'id');
    }
}
