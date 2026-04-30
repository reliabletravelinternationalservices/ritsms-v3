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
        Schema::create('package_groups_items', function (Blueprint $table) {
            $table->unsignedBigInteger('package_group_id');
            $table->unsignedBigInteger('package_id');
            $table->unsignedInteger('order_number')->default(0);

            $table->foreign('package_group_id')
                ->references('id')
                ->on('package_groups')
                ->cascadeOnDelete();

            $table->foreign('package_id')
                ->references('id')
                ->on('packages')
                ->cascadeOnDelete();

            $table->primary(['package_group_id', 'package_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_groups_items');
    }
};
