<?php

namespace App\Services\Convo;

use App\Enums\Convo\Type;
use App\Enums\ConvoParticipant\Role;
use App\Enums\User\Role as UserRole;
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
                $user = User::findOrFail($id);
                $partcipantRole = Role::MEMBER;

                if($id === $creatorID){
                    $partcipantRole = Role::OWNER;
                }
                elseif(
                    $user->role === UserRole::ADMIN ||
                    $user->role === UserRole::AGENT
                ){
                    $partcipantRole = Role::ADMIN;
                }else{
                    $partcipantRole = Role::MEMBER;
                }

                $conversation->participants()->create([
                    'participant_id' => $id,
                    'participant_type' => User::class,
                    'role' => $partcipantRole,
                    'joined_at' => now(),
                ]);
            }
    
            return $conversation;
        });
    }
}
