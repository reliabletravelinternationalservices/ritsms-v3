<?php

namespace App\Models;

use App\Enums\Convo\Type;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['type','name','avatar','created_by_type','created_by_id'])]
class Conversation extends Model
{
    use SoftDeletes;

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

}
