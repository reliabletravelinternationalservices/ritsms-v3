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
            // References
            $table->foreignId('client_id')
                ->nullable()
                ->constrained('clients')
                ->nullOnDelete();

            $table->foreignId('quotation_id')
                ->nullable()
                ->constrained('quotations')
                ->nullOnDelete();

            // Booking identification
            $table->string('code')->unique();
            $table->string('slug')->unique();
            $table->enum('status', [
                'pending',
                'confirmed',
                'in_progress',
                'cancelled',
                'completed',
            ])->default('pending');

            // Client snapshot
            $table->string('client_code')->nullable();
            $table->string('client_name');
            $table->string('client_email')->nullable();
            $table->string('client_phone')->nullable();

            // Tour references
            $table->foreignId('tour_id')
                ->nullable()
                ->constrained('tours')
                ->nullOnDelete();

            $table->foreignId('tour_departure_id')
                ->nullable()
                ->constrained('tour_departures')
                ->nullOnDelete();

            // Tour snapshot
            $table->string('tour_code');
            $table->string('tour_name');
            $table->string('tour_duration');

            // Travel dates
            $table->date('departure_date');
            $table->date('return_date');

            // Flight / travel details
            $table->time('departure_time')->nullable();
            $table->time('return_time')->nullable();
            $table->string('airline_name')->nullable();
            $table->string('departure_flight_no')->nullable();
            $table->string('return_flight_no')->nullable();

            // Travelers
            $table->unsignedInteger('total_pax')->default(1);

            // Pricing snapshot
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('discount_total', 12, 2)->default(0);
            $table->decimal('tax_total', 12, 2)->default(0);
            $table->decimal('grand_total', 12, 2)->default(0);

            // Notes
            $table->text('remarks')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
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
