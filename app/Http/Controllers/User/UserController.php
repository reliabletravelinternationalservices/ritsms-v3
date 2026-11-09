<?php

namespace App\Http\Controllers\User;

use App\Enums\Convo\Type;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserContactResource;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use AuthorizesRequests;

    public function searchContacts(Request $request)
    {
        $user = auth('web')->user();

        abort_unless($user, 401);

        $users = User::query()
            ->with([
                'conversations' => function ($query) use ($user) {
                    $query->where('type', Type::PRIVATE)
                        ->whereHas('participants', function ($q) use ($user) {
                            $q->where('participant_type', $user->getMorphClass())
                                ->where('participant_id', $user->id);
                        })
                        ->with([
                            'participants.participant',
                            'createdBy',
                            'latestMessage.sender',
                        ])
                        ->latest('updated_at')
                        ->limit(1);
                },
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('display_name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%");
                });
            })
            ->orderByDesc('id')
            ->cursorPaginate(
                10,
                ['*'],
                'cursor',
                $request->input('cursor')
            );

        return UserContactResource::collection($users);
    }
}
