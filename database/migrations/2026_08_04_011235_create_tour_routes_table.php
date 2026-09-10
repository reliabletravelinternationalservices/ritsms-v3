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
        Schema::create('tour_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained('tours')->cascadeOnDelete();
            $table->foreignId('departure_country_id')->constrained('countries')->cascadeOnDelete();
            $table->foreignId('destination_country_id')->constrained('countries')->cascadeOnDelete();
            $table->string('departure_city', 120);
            $table->string('destination_city', 120);
            $table->unsignedSmallInteger('sequence');
            $table->unique(['tour_id', 'sequence']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_routes');
    }
};
