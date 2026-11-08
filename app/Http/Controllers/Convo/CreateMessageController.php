<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\MessageResource;
use App\Models\Conversation;
use App\Services\Convo\MessageService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class CreateMessageController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected MessageService $service) {}

    public function store(Request $request, Conversation $convo)
    {
        $this->authorize('sendMessage', $convo);

        $validated = $request->validate([
            'client_id' => ['required', 'string'],
            'message' => ['required', 'string'],
        ]);

        $user = auth('web')->user();

        abort_unless($user, 401);


        $message = $this->service->createTextMessage(
            $convo,
            $validated['message'],
            $user->id,
            $validated['client_id']
        );

        $message->load([
            "sender",
            "replyTo.sender",
        ]);

        // broadcast(new MessageSent($message))->toOthers();

        return MessageResource::make($message);
    }
}
