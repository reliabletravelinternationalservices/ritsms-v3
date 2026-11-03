<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'type',
        'name',
        'avatar',
        'created_by_type',
        'created_by_id',
    ];



    public function participants()
    {
        return $this->hasMany(ConversationParticipant::class);
    }
}
