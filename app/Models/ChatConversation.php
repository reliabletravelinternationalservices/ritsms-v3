<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ChatConversation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'created_by_type',
        'created_by_id',
    ];



    public function unreadMessages(): HasMany
    {
        return $this->messages()
            ->whereHas('reads', function ($query) {
                $query->where('state', 'unread');
            });
    }

    public function latestMessage(): HasOne
    {
        return $this->hasOne(
            ChatConversationMessage::class,
            'chat_conversation_id'
        )->latestOfMany();
    }


    /**
     * User or client who created the conversation.
     */
    public function createdBy(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * User or client who temporarily deleted the conversation.
     */
    public function deletedBy(): MorphTo
    {
        return $this->morphTo();
    }


    public function messages(): HasMany
    {
        return $this->hasMany(
            ChatConversationMessage::class,
            'chat_conversation_id'
        );
    }

    public function participants(): HasMany
    {
        return $this->hasMany(
            ChatConversationParticipant::class,
            'chat_conversation_id'
        );
    }
}
