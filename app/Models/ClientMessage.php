<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClientMessage extends Model
{
    protected $fillable = [
        'client_conversation_id',
        'sender_type',
        'sender_id',
        'message',
        'state',
        'read_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'state' => 'string',
    ];


    public function conversations(): HasMany
    {
        return $this->hasMany(ClientConversation::class, 'client_conversation_id');
    }
}
