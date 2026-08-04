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
        Schema::create('tour_group_items', function (Blueprint $table) {
            $table->foreignId('tour_group_id')
                ->constrained('tour_groups')
                ->cascadeOnDelete();
            $table->foreignId('tour_id')
                ->constrained('tours')
                ->cascadeOnDelete();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->unique(['tour_group_id', 'tour_id']);
            $table->index(['tour_group_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_group_items');
    }
};
