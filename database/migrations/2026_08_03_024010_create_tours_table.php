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
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->string('slug', 100)->unique();
            $table->string('name', 120);
            $table->enum('category', ['domestic', 'inbound', 'outbound']);
            $table->enum('itinerary_type', ['round_trip', 'tri_city', 'multi_city', 'one_way']);
            $table->enum('tour_type', ['regular', 'private', 'custom', 'group']);
            $table->enum('state', ['draft', 'published', 'archived'])->default('draft');
            $table->enum('visibility', ['public', 'private'])->default('private');
            $table->unsignedInteger('duration')->default(1);
            $table->json('highlights');
            $table->json('inclusions');
            $table->json('exclusions')->nullable();
            $table->json('terms_and_conditions');
            $table->string('description', 225);
            $table->string('badge', 100)->nullable();
            $table->date('booking_deadline')->nullable();
            $table->text('notes')->nullable()
                ->comment('For Internal Use Only - Not visible to customers');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
