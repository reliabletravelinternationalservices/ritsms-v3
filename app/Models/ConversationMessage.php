<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConversationMessage extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'conversation_id',
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

    public function reads()
    {
        return $this->hasMany(ConversationMessageRead::class);
    }
}
