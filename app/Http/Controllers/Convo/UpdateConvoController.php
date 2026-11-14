<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\ConversationResource;
use App\Models\Conversation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UpdateConvoController extends Controller
{
    use AuthorizesRequests;

    public function update(Request $request, Conversation $convo)
    {
        $this->authorize('update', $convo);

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
            'remove_avatar' => ['sometimes', 'boolean'],
        ]);

        $convo->name = $validatedData['name'];

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');

            $filename = 'conversation_'.$convo->id.'_'.Str::uuid().'.'.$file->extension();

            $convo->avatar = $file->storeAs(
                'uploads/avatars/convo/'.$convo->id,
                $filename,
                'public'
            );
        } elseif ($validatedData['remove_avatar'] ?? false) {
            $convo->avatar = null;
        }

        $convo->save();

        return ConversationResource::make($convo);
    }
}
