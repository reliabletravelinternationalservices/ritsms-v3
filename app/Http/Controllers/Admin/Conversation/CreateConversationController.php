<?php

namespace App\Http\Controllers\Admin\Conversation;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\ConvoCreated;
use App\Models\ChatConversation;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CreateConversationController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'codes' => ['required', 'array', 'min:1'],
            'codes.*' => [
                'required',
                'string',
                'distinct',
                function ($attribute, $value, $fail) {
                    $clientExists = Client::where('code', $value)->exists();

                    $agentExists = User::where('code', $value)
                        ->where('role', 'agent')
                        ->exists();

                    if (! $clientExists && ! $agentExists) {
                        $fail("The selected code '{$value}' does not exist in clients or agents.");
                    }
                },
            ],
        ]);

        $creator = Auth::guard('web')->user();

        if (! $creator) {
            abort(401, 'Unauthenticated.');
        }

        $convo = DB::transaction(function () use ($validatedData, $creator) {
            // Fetch all selected members
            $members = collect($validatedData['codes'])
                ->map(function ($code) {
                    return Client::where('code', $code)->first()
                        ?? User::where('code', $code)
                            ->where('role', 'agent')
                            ->first();
                })
                ->filter()
                ->values();

            if ($members->count() !== count($validatedData['codes'])) {
                throw ValidationException::withMessages([
                    'codes' => ['One or more selected contacts could not be found.'],
                ]);
            }

            // Generate conversation name
            $names = $members->pluck('name')->all();

            $convoName = implode(', ', array_slice($names, 0, 3));

            if (count($names) > 3) {
                $convoName .= ', and ' . (count($names) - 3) . ' more';
            }

            // Create conversation
            $convo = ChatConversation::create([
                'name' => $convoName,
                'created_by_type' => get_class($creator),
                'created_by_id' => $creator->id,
            ]);

            // Attach participants
            foreach ($members as $member) {
                $convo->participants()->create([
                    'joined_at' => now(),
                    'participant_type' => get_class($member),
                    'participant_id' => $member->id
                ]); 

            }

            return $convo;
        });

        return response()->json([
            'message' => 'Conversation created successfully.',
            'conversation' => $convo->load([
                'participants.participant',
                'createdBy',
            ]),
        ], 201);
    }
}
