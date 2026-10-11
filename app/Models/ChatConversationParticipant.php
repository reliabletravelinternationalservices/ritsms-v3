<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ChatConversationParticipant extends Model
{
    protected $fillable = [
        'chat_conversation_id',
        'joined_at',
        'removed_at',
    ];

    protected function casts(): array
    {
        return [
            'joined_at' => 'datetime',
            'removed_at' => 'datetime',
        ];
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(
            ChatConversation::class,
            'chat_conversation_id'
        );
    }

    public function participant(): MorphTo
    {
        return $this->morphTo();
    }

    public function removedBy(): MorphTo
    {
        return $this->morphTo();
    }
}
