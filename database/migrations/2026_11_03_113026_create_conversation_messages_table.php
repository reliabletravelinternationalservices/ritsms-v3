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
        Schema::create('conversation_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->nullableMorphs('sender');
            $table->text('body')->nullable();
            $table->enum('type', ['text', 'image', 'video', 'file', 'system'])->default('text');
            $table->foreignId('reply_to_id')
                ->nullable()
                ->constrained('conversation_messages')
                ->nullOnDelete();

            $table->timestamp('sent_at')->nullable();
            $table->boolean('is_edited')->default(false);
            $table->string('client_id', 50)->nullable();

            $table->softDeletes();
            $table->timestamps();

            $table->unique(
                ['conversation_id', 'sender_type', 'sender_id', 'client_id'],
                'conversation_message_client_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversation_messages');
    }
};
