<?php

namespace App\Http\Controllers\Convo;

use App\Enums\Convo\Type;
use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\ConversationResource;
use App\Models\Conversation;
use App\Models\User;
use App\Services\Convo\ConvoService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CreateConvoController extends Controller
{
    use AuthorizesRequests;
    public function __construct(protected ConvoService $service)
    {
    }

    public function store(Request $request)
    {
        $this->authorize('create', Conversation::class);

        $user = auth('web')->user();
        abort_unless($user, 403, 'Unauthorized');

        $validatedData = $request->validate([
            'convo_type' => ['required', Rule::enum(Type::class)],
            'participant_ids' => ['required', 'array', 'min:1'],
            'participant_ids.*' => ['required', 'distinct', 'exists:users,id'],
        ]);

        $conversation = $this->service->create(
            $validatedData['participant_ids'],
            Type::getType($validatedData['convo_type']),
            $user->id
        );

        // Load conversation relationships.
        $conversation->load([
            'participants.conversation',
            'participants.participant',
            'createdBy',
            'latestMessage.sender',
        ]);

        // Generate group name.
        if ($conversation->type === Type::GROUP) {
            $conversation->update([
                'name' => $conversation->generateGroupName(),
            ]);
        }

        return ConversationResource::make($conversation);
    }
}
