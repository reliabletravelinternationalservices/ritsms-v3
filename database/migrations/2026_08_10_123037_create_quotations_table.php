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
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();

            // Client
            $table->foreignId('client_id')
                ->nullable()
                ->constrained('clients')
                ->nullOnDelete();

            $table->string('primary_client_name', 100);
            $table->string('primary_client_email', 150);
            $table->string('primary_client_phone', 30);

            // Quotation
            $table->string('code', 20)->unique();
            $table->string('slug', 100)->unique();

            $table->enum('status', [
                'draft',
                'sent',
                'viewed',
                'accepted',
                'rejected',
                'expired',
                'cancelled',
            ])->default('draft');

            $table->date('valid_until')->nullable();

            // Tour
            $table->foreignId('tour_id')
                ->nullable()
                ->constrained('tours')
                ->nullOnDelete();

            // Tour snapshot
            $table->string('tour_name', 200)->nullable();
            $table->unsignedInteger('tour_duration')->nullable();

            // Existing departure, if selected
            $table->foreignId('tour_departure_id')
                ->nullable()
                ->constrained('tour_departures')
                ->nullOnDelete();

            // Quoted travel dates
            $table->date('departure_date')->nullable();
            $table->date('return_date')->nullable();

            $table->unsignedInteger('total_pax')->default(1);

            // Pricing
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('discount_total', 12, 2)->default(0);
            $table->decimal('tax_total', 12, 2)->default(0);
            $table->decimal('grand_total', 12, 2)->default(0);

            // Quotation tracking
            $table->dateTime('sent_at')->nullable();
            $table->dateTime('viewed_at')->nullable();
            $table->dateTime('accepted_at')->nullable();

            // Notes
            $table->text('remarks')->nullable(); // Client-visible
            $table->text('notes')->nullable();   // Internal only

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
