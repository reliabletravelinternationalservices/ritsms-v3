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
        return $this->belongsTo(
            self::class,
            'reply_to_id'
        )->withTrashed();
    }

    public function isRead(): bool
    {
        if (!$this->sent_at || !$this->conversation) {
            return false;
        }

        $user = auth('web')->user();

        if (!$user) {
            return false;
        }

        $participant = $this->conversation
            ->participants()
            ->where('participant_id', '!=' , $user->id)
            ->where('participant_type', $user->getMorphClass())
            ->first();

        return $participant?->last_read_at !== null
            && $participant->last_read_at->greaterThanOrEqualTo($this->sent_at);
    }
}
