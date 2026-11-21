<?php

namespace App\Http\Controllers\Convo;


use App\Http\Controllers\Controller;
use App\Http\Requests\Conversations\CreateConversationRequest;
use App\Http\Resources\Convo\ConversationResource;
use App\Services\Convo\ConvoService;


class CreateConvoController extends Controller
{
    public function __construct(protected ConvoService $service)
    {
    }


    public function store(CreateConversationRequest $request)
    {
        $validated = $request->validated();

        $conversation = $this->service->create(
            participantIDs: $validated['participant_ids'],
            type: $validated['convo_type'],
            creatorID: $request->user()->id,
        );

        return ConversationResource::make($conversation);
    }
}
