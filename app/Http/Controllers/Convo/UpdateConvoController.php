<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Requests\Conversations\UpdateConversationRequest;
use App\Http\Resources\Convo\ConversationResource;
use App\Models\Conversation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UpdateConvoController extends Controller
{

    public function update(UpdateConversationRequest $request, Conversation $convo)
    {

        $validated = $request->validated();

        $convo->name = $validated['name'];

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');

            $filename = 'conversation_' . $convo->id . '_' . Str::uuid() . '.' . $file->extension();

            $newAvatar = $file->storeAs(
                'uploads/avatars/convo/' . $convo->id,
                $filename,
                'public'
            );

            // Delete old avatar
            if ($convo->avatar) {
                Storage::disk('public')->delete($convo->avatar);
            }

            $convo->avatar = $newAvatar;
        } elseif ($validated['remove_avatar'] ?? false) {

            // Delete existing avatar
            if ($convo->avatar) {
                Storage::disk('public')->delete($convo->avatar);
            }

            $convo->avatar = null;
        }

        $convo->save();

        $convo->load(['latestMessage.sender']);

        return ConversationResource::make($convo);
    }
}
