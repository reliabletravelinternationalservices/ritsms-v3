<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chat_conversation_messages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('chat_conversation_id')
                ->constrained('chat_conversations')
                ->cascadeOnDelete();

            $table->morphs('sender');
            $table->text('message');
            $table->enum('type', ['text', 'system', 'image', 'file'])->default('text');
            $table->timestamps();

            $table->index(['chat_conversation_id', 'created_at', 'id'], 'chat_conversation_messages_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_conversation_messages');
    }
};
