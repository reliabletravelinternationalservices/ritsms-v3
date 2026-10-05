<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Conversation extends Model
{
    protected $fillable = [
        'name',
        'avatar',
        'last_message_at',
        'is_turned_over',
        'turned_over_at',
    ];

    protected $casts = [
        'last_message_at' => 'datetime',
        'is_turned_over' => 'boolean',
        'turned_over_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function participants(): HasMany
    {
        return $this->hasMany(
            ConversationParticipant::class
        );
    }

    public function messages(): HasMany
    {
        return $this->hasMany(
            Message::class
        );
    }

    public function lastMessage(): HasOne
    {
        return $this->hasOne(
            Message::class
        )->latestOfMany();
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function isTurnedOver(): bool
    {
        return $this->is_turned_over;
    }

    public function turnOver(): void
    {
        $this->update([
            'is_turned_over' => true,
            'turned_over_at' => now(),
        ]);
    }
}
