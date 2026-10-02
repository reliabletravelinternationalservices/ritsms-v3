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
        Schema::create('client_messages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('client_conversation_id')
                ->constrained('client_conversations')
                ->cascadeOnDelete();

            $table->string('sender_type');
            $table->unsignedBigInteger('sender_id')->nullable();

            $table->text('message');

            $table->enum('state', ['unread', 'read'])->default('unread');

            $table->timestamp('read_at')->nullable();

            $table->timestamps();

            $table->index([
                'sender_type',
                'sender_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_messages');
    }
};
