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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('mediable_id');
            $table->string('mediable_type');

            $table->string('file_name');
            $table->string('file_path');
            $table->string('url')->nullable();
            $table->enum('disk', ['local', 'public', 'cloudinary', 's3'])->default('public');
            $table->enum('type', ['image', 'video', 'document', 'audio'])->default('image');
            $table->string('mime_type')->nullable();
            $table->bigInteger('size')->nullable();
            $table->string('alt_text');
            $table->integer('order_number')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
