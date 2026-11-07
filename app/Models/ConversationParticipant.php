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
        'role' => Role::class
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function getUnreadMessagesCount(): int
    {
        if (!$this->conversation) {
            return 0;
        }

        return $this->conversation
            ->messages()
            ->where(function ($query) {
                $query->whereNull('sender_type')
                    ->orWhere('sender_type', '!=', $this->participant_type)
                    ->orWhere('sender_id', '!=', $this->participant_id);
            })
            ->whereNotNull('sent_at')
            ->when(
                $this->last_read_at,
                fn($query) => $query->where('sent_at', '>', $this->last_read_at)
            )
            ->when(
                !$this->last_read_at,
                fn($query) => $query
            )
            ->count();
    }
}
