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
        Schema::create('tour_departures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained()->cascadeOnDelete();
            $table->decimal('base_price', 10, 2)->default(0);
            $table->decimal('discounted_price', 10, 2)->nullable();
            $table->unsignedInteger('min_pax')->default(1);
            $table->unsignedInteger('max_pax')->nullable();
            $table->date('departure_date');
            $table->date('return_date');
            $table->string('airline_name');
            $table->string('departure_flight_no', 90);
            $table->string('return_flight_no', 90);
            $table->boolean('is_active')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_departures');
    }
};
