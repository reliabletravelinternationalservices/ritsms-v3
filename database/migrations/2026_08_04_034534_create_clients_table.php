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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->string('slug', 100)->unique();
            $table->string('name', 100);
            $table->string('email', 100)->unique();
            $table->string('phone', 20)->nullable();
            $table->text('address')->nullable();
            $table->enum(
                'status',
                [
                    'new',
                    'contacted',
                    'qualified',
                    'quotation_sent',
                    'booked',
                    'completed',
                    'Unresponsive',
                    'cancelled',
                    'disqualified'
                ]
            )->nullable();

            $table->enum(
                'source',
                [
                    'website',
                    'manual',
                    'gmail',
                    'walk_in',
                    'google_ads',
                    'facebook',
                    'instagram',
                    'tiktok',
                    'youtube',
                    'other'
                ]
            )->nullable();

            $table->enum('gender', ['male', 'female', 'transgender', 'other'])->nullable();
            $table->boolean('accept_marketing')->default(false);
            $table->string('website_link', 255)->nullable();
            $table->string('facebook_link', 255)->nullable();
            $table->dateTime('last_contacted_at')->nullable();


            $table->text('notes')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
