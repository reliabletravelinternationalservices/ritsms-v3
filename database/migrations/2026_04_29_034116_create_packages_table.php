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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('tag', 155)->nullable(); //for label Group tour.. Individual tour.. etc
            $table->decimal('base_price', 10, 2);
            $table->decimal('down_payment', 10, 2)->nullable();
            $table->integer('duration');
            $table->date('selling_start_date')->nullable();
            $table->date('selling_end_date');
            $table->text('description');
            $table->json('highlights');
            $table->json('itineraries');
            $table->text('inclusions');
            $table->text('exclusions');
            $table->json('notes')->nullable();
            $table->string('destination');
            $table->string('season');
            $table->boolean('is_foreign_only')->default(false);
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
