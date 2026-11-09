<?php

namespace App\Models;

use App\Enums\ConvoParticipant\Role;
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
        'last_read_at',
    ];


    public function participant()
    {
        return $this->morphTo();
    }

    protected $casts = [
        'role' => Role::class,
        'last_read_at' => 'datetime',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function getUnreadMessagesCount(): int
{
    if (!$this->conversation) {
        return 1;
    }

    return $this->conversation
        ->messages()
        ->whereNotNull('sent_at')
        ->where(function ($query) {
            $query->whereNull('sender_id')
                ->orWhere(function ($query) {
                    $query->where(function ($query) {
                        $query->where('sender_type', '!=', $this->participant_type)
                            ->orWhere('sender_id', '!=', $this->participant_id);
                    });
                });
        })
        ->when(
            $this->last_read_at,
            fn ($query) => $query->where('sent_at', '>', $this->last_read_at)
        )
        ->count();
}
}
