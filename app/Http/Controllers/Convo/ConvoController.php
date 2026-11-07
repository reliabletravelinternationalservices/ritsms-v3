<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConvoController extends Controller
{

    public function getConvos(Request $request)
    {
        $user = auth('web')->user();

        abort_unless($user, 401);

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
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%');
            })
            ->orderByDesc('updated_at')
            ->orderByDesc('id')
            ->cursorPaginate(
                20,
                ['*'],
                'cursor',
                $request->input('cursor')
            )
            ->withQueryString();

        return ConversationResource::collection($convos);
    }
}
