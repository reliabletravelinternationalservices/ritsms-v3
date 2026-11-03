<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConversationParticipant extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'conversation_id',
        'participant_type',
        'participant_id',
        'role',
        'joined_at',
        'left_at',
    ];



    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
