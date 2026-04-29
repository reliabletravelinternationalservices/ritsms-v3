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
        Schema::create('package_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('packages')->restrictOnDelete();
            $table->date('departure_date');
            $table->date('return_date')->nullable();
            $table->decimal('price', 10, 2);
            $table->boolean('is_available')->default(true);
            $table->boolean('is_limited')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_schedules');
    }
};
