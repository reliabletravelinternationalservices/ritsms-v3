<?php

namespace App\Models;

use App\Enums\Convo\Type;
use App\Services\Convo\MessageService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;

class Conversation extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'type',
        'name',
        'avatar',
        'created_by_type',
        'created_by_id',
    ];

    protected $casts = [
        'type' => Type::class
    ];


    public function createdBy()
    {
        return $this->morphTo();
    }

    public function latestMessage()
    {
        return $this->hasOne(ConversationMessage::class)
            ->latestOfMany();
    }

    public function messages()
    {
        return $this->hasMany(ConversationMessage::class);
    }

    public function participants()
    {
        return $this->hasMany(ConversationParticipant::class);
    }

    public function generateGroupName(): string
    {
        $names = $this->participants
            ->pluck('participant.display_name')
            ->map(fn ($name) => explode(' ', trim($name))[0]);

        $displayNames = $names->take(3)->implode(', ');

        if ($names->count() > 3) {
            $displayNames .= ' and ' . ($names->count() - 3) . ' others';
        }

        return $displayNames;
    }
}
