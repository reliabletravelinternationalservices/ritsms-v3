<?php

namespace App\Http\Requests\Conversations;

use App\Enums\Convo\Type;
use App\Models\Conversation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateConversationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('create', Conversation::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'convo_type' => ['required', Rule::enum(Type::class)],
            'participant_ids' => ['required', 'array', 'min:1'],
            'participant_ids.*' => ['required', 'distinct', 'exists:users,id'],
        ];
    }
}
