<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chat_conversation_participants', function (Blueprint $table) {
            $table->id();

            $table->foreignId('chat_conversation_id')
                ->constrained('chat_conversations')
                ->cascadeOnDelete();

            // Polymorphic participant columns with a shorter index name
            $table->string('participant_type');
            $table->unsignedBigInteger('participant_id');

            $table->index(
                ['participant_type', 'participant_id'],
                'chat_participant_lookup_idx'
            );

            $table->timestamp('joined_at')->useCurrent();

            $table->timestamp('removed_at')->nullable();

            $table->nullableMorphs('removed_by', 'chat_removed_by_idx');

            $table->timestamps();

            $table->unique(
                [
                    'chat_conversation_id',
                    'participant_type',
                    'participant_id',
                ],
                'chat_participants_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_conversation_participants');
    }
};
