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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->restrictOnDelete();
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->enum('status', ['pending','for_review', 'confirmed', 'reschedule_proposed', 'cancelled', 'completed'])->default('pending');
            $table->enum('source', ['website', 'manual', 'gmail', 'walk_in', 'google_ads', 'facebook', 'instagram', 'tiktok', 'youtube', 'other'])->default('other');
            $table->enum('payment_status', ['unpaid', 'partial', 'paid'])->default('unpaid');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
