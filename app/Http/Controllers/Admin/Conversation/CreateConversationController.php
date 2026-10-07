<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\ConvoCreated;

class CreateConversationController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'contacts' => ['required', 'array', 'min:1'],
            'contacts.*.id' => ['required', 'integer'],
            'contacts.*.name' => ['required', 'string'],
            'contacts.*.type' => ['required', 'in:admin,agent,client'],
        ]);

        DB::transaction(function () use ($request) {
            $contacts = collect($request->input('contacts'));

            /*
            |--------------------------------------------------------------------------
            | Conversation Name
            |--------------------------------------------------------------------------
            */

            $names = $contacts
                ->pluck('name')
                ->filter()
                ->values();

            $convoName = $names->take(3)->implode(', ');

            if ($names->count() > 3) {
                $convoName .= ', and more...';
            }

            if ($convoName === '') {
                $convoName = 'New Conversation';
            }

            /*
            |--------------------------------------------------------------------------
            | Create Conversation
            |--------------------------------------------------------------------------
            */

            $conversation = Conversation::create([
                'name' => $convoName,
            ]);

            /*
            |--------------------------------------------------------------------------
            | Create Participants
            |--------------------------------------------------------------------------
            */

            foreach ($contacts as $contact) {

                $participant = match ($contact['type']) {
                    'client' => Client::findOrFail($contact['id']),

                    'admin',
                    'agent' => User::findOrFail($contact['id']),
                };

                $conversation->participants()->create([
                    'participant_type' => $participant->getMorphClass(),
                    'participant_id' => $participant->getKey(),
                ]);
            }

            $conversation->load('participants');
            
            ConvoCreated::dispatch($conversation);
        });

        return back()->with('success', 'Conversation created successfully.');
    }
}
