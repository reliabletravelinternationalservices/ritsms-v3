<?php

namespace App\Http\Controllers\Convo;

use App\Http\Controllers\Controller;
use App\Http\Resources\Convo\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UpdateConvoController extends Controller
{

    public function update(Request $request, Conversation $convo)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
        ]);

        $convo->name = $validatedData['name'];

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');

            $filename = 'conversation_' . $convo->id . '_' . Str::uuid() . '.' . $file->extension();

            $convo->avatar = $file->storeAs(
                'uploads/avatars/convo/' . $convo->id,
                $filename,
                'public'
            );
        }

        $convo->save();

        return ConversationResource::make($convo);
    }
}
