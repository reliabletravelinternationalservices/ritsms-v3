<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class ChatSession extends Model
{
    protected $fillable = [
        'uuid',
        'code',
        'status',
        'last_message_at',
        'closed_at',
    ];

    protected static function booted(): void
    {
        static::creating(function (ChatSession $session) {
            $session->uuid ??= (string) Str::uuid();

            $session->token ??= Str::random(64);

            $session->code ??= self::generateCode();
        });
    }

    protected static function generateCode(): string
    {
        do {
            $code = 'SC-'
                . now()->format('Ymd')
                . '-'
                . random_int(1000, 9999);
        } while (self::where('code', $code)->exists());

        return $code;
    }

    public function latestMessage(): HasOne
    {
        return $this->hasOne(ChatMessage::class)
            ->latestOfMany();
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class);
    }
}