<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chat_conversation_message_reads', function (Blueprint $table) {
            $table->id();

            // Message that was read
            $table->foreignId('chat_conversation_message_id')
                ->constrained(
                    table: 'chat_conversation_messages',
                    indexName: 'ccmr_message_fk'
                )
                ->cascadeOnDelete();

            // User or agent who read the message
            $table->morphs('reader', 'ccmr_reader_idx');

            $table->timestamp('read_at')->useCurrent();

            $table->timestamps();

            $table->unique(
                [
                    'chat_conversation_message_id',
                    'reader_type',
                    'reader_id',
                ],
                'ccmr_message_reader_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_conversation_message_reads');
    }
};
