<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConversationMessageRead extends Model
{
    protected $fillable = [
        'conversation_message_id',
        'user_id',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    public function conversationMessage()
    {
        return $this->belongsTo(ConversationMessage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
