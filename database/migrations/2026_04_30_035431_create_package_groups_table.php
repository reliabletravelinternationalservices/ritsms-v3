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
        Schema::create('package_groups', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('tag')->nullable();
            $table->boolean('include_as_outbound')->default(false);
            $table->boolean('include_as_inbound')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_groups');
    }
};
