<?php

namespace App\Http\Controllers\Convo;

use App\Enums\Convo\Type;
use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\ConversationResource;
use App\Models\Conversation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class ConvoController extends Controller
{
    use AuthorizesRequests;

    public function getConvos(Request $request)
    {

        $user = auth('web')->user();

        abort_unless($user, 401);

        $search = $request->input('search');

        $convos = Conversation::query()
            ->with([
                'participants.participant',
                'createdBy',
                'latestMessage.sender',
            ])
            ->whereHas('participants', function ($query) use ($user) {
                $query->where('participant_id', $user->id)
                    ->where('participant_type', $user->getMorphClass());
            })
            ->when($search, function ($query) use ($search, $user) {
                $query->where(function ($query) use ($search, $user) {

                    // GROUP: Search conversation name
                    $query->where(function ($query) use ($search) {
                        $query->where('type', Type::GROUP)
                            ->where('name', 'like', "%{$search}%");
                    })

                        // PRIVATE: Search the other participant's name
                        ->orWhere(function ($query) use ($search, $user) {
                            $query->where('type', Type::PRIVATE)
                                ->whereHas('participants', function ($query) use ($search, $user) {
                                    $query->where('participant_id', '!=', $user->id)
                                        ->where('participant_type', $user->getMorphClass())
                                        ->whereHas('participant', function ($query) use ($search) {
                                            $query->where('display_name', 'like', "%{$search}%");
                                        });
                                });
                        });
                });
            })
            ->orderByDesc('updated_at')
            ->orderByDesc('id')
            ->cursorPaginate(
                $request->input('per_page', 20),
                ['*'],
                'cursor',
                $request->input('cursor')
            )
            ->withQueryString();

        return ConversationResource::collection($convos);
    }
}
