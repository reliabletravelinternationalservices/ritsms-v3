<?php

namespace App\Models;

use App\Enums\ConvoMessage\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConversationMessage extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'conversation_id',
        'client_id',
        'sender_type',
        'sender_id',
        'body',
        'type',
        'reply_to_id',
        'sent_at',
        'is_edited',
    ];


    protected $casts = [
        'sent_at' => 'datetime',
        'is_edited' => 'boolean',
        'type' => Type::class,
    ];


    protected $with = [
        'sender',
        'replyTo',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->morphTo();
    }

    public function replyTo()
    {
        return $this->belongsTo(self::class, 'reply_to_id');
    }

    public function isRead(): bool
    {
        if (!$this->sent_at || !$this->conversation) {
            return false;
        }

        return $this->conversation
            ->participants()
            ->where(function ($query) {
                $query->where('participant_id', '!=', $this->sender_id)
                    ->orWhere('participant_type', '!=', $this->sender_type);
            })
            ->where('last_read_at', '>=', $this->sent_at)
            ->exists();
    }
}
