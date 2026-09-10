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
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            
            $table->string('code', 20)->unique();
            $table->string('slug', 100)->unique();
            $table->enum('status',  [
                'draft', 
                'sent', 
                'viewed', 
                'accepted', 
                'rejected', 
                'expired', 
                'cancelled'
            ])->default('draft');
            $table->date('valid_until')->nullable();

            $table->decimal('subtotal', 10,2)->default(0);
            $table->decimal('discount_total', 10,2)->default(0);
            $table->decimal('tax_total', 10,2)->default(0);
            $table->decimal('grand_total', 10,2)->default(0);
            
            $table->datetime('sent_at')->nullable();
            $table->dateTime('viewed_at')->nullable();
            $table->dateTime('accepted_at')->nullable();
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
        Schema::dropIfExists('quotations');
    }
};
