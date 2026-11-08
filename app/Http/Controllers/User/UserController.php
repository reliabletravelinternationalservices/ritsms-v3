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
        $authId = auth('web')->id();

        $users = User::query()
            ->withExists([
                'conversations as has_private_conversation' => function ($query) use ($authId) {
                    $query->where('type', Type::PRIVATE)
                        ->whereHas('participants', function ($q) use ($authId) {
                            $q->where('participant_type', (new User)->getMorphClass())
                                ->where('participant_id', $authId);
                        });
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
