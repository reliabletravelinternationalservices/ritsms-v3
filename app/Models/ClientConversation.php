<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientConversation extends Model
{
    protected $fillable = [
        'client_id',
        'status',
        'last_message_at',
        'closed_at',
    ];

    protected $casts = [
        'last_message_at' => 'datetime',
        'closed_at' => 'datetime',
    ];


    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function messages()
    {
        return $this->hasMany(ClientMessage::class);
    }
}
