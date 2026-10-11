<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ChatConversationMessageRead extends Model
{
    protected $fillable = [
        'chat_conversation_message_id',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }

    public function message(): BelongsTo
    {
        return $this->belongsTo(
            ChatConversationMessage::class,
            'chat_conversation_message_id'
        );
    }

    public function reader(): MorphTo
    {
        return $this->morphTo();
    }
}
