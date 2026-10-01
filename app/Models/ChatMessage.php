<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    protected $fillable = [
        'chat_session_id',
        'sender_type',
        'message',
        'state',
    ];

    public function chatSession(): BelongsTo
    {
        return $this->belongsTo(
            ChatSession::class,
            'chat_session_id'
        );
    }
}