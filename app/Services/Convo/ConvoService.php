<?php

namespace App\Services\Convo;

use App\Enums\Convo\Type;
use App\Enums\ConvoParticipant\Role;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ConvoService
{
    public function create(
        array $participantIDs,
        Type $type,
        int $creatorID,
        ?string $name = null
    ): Conversation {

        return DB::transaction(function () use ($participantIDs, $type, $creatorID, $name) {

            $creator = User::findOrFail($creatorID);

            $conversation = Conversation::create([
                'name' => $name,
                'type' => $type,
                'created_by_id' => $creator->id,
                'created_by_type' => User::class,
            ]);

            $participantIDs = array_unique([
                ...$participantIDs,
                $creatorID,
            ]);

            foreach ($participantIDs as $id) {
                User::findOrFail($id);

                $conversation->participants()->create([
                    'participant_id' => $id,
                    'participant_type' => User::class,
                    'role' => $type === Type::GROUP && $id === $creatorID
                        ? Role::OWNER
                        : Role::MEMBER,
                    'joined_at' => now(),
                ]);
            }


            return $conversation;
        });
    }
}
