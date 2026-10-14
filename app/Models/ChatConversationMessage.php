<?php

namespace App\Models;

use App\Enums\Conversation\MessageType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;


/**
 * @property MessageType $type
 */

class ChatConversationMessage extends Model
{
    protected $fillable = [
        'chat_conversation_id',
        'message',
        'type',
    ];


    protected $casts = [
        'type' => MessageType::class,
    ];


    public function new_message(): MorphOne
    {
        return $this->morphOne(
            ChatConversationMessageRead::class,
            'reader'
        )->whereNull('read_at');
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(
            ChatConversation::class,
            'chat_conversation_id'
        );
    }

    public function sender(): MorphTo
    {
        return $this->morphTo();
    }

    public function reads(): HasMany
    {
        return $this->hasMany(
            ChatConversationMessageRead::class,
            'chat_conversation_message_id'
        );
    }
}
