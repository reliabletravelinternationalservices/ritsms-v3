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
        Schema::create('departure_flights', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tour_departure_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('airline', 120);
            $table->string('flight_number', 20);

            $table->char('departure_airport', 3)->nullable();
            $table->char('arrival_airport', 3)->nullable();

            $table->dateTime('departure_time');
            $table->dateTime('arrival_time')->nullable();

            $table->enum('direction', ['outbound', 'return'])
                ->default('outbound');

            $table->unsignedSmallInteger('sequence')->default(1);

            $table->unique([
                'tour_departure_id',
                'direction',
                'sequence',
            ]);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departure_flights');
    }
};
