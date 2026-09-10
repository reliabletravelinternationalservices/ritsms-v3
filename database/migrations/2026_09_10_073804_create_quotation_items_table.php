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
        Schema::create('quotation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quotation_id')->constrained('quotations')->cascadeOnDelete();
            $table->enum('item_type', [
                'tour', 
                'hotel', 
                'flight',
                'visa',
                'insurance',
                'transport',
                'fee',
                'discount',
                'other'])
                ->default('other');
            
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('details')->nullable();
            $table->decimal('quantity', 10,2)->default(0);
            $table->decimal('unit_price', 10,2)->default(0);
            $table->decimal('discount', 10,2)->default(0);
            $table->decimal('tax', 10,2)->default(0);
            $table->decimal('total', 10,2)->default(0);
            
            $table->text('remarks')->nullable();
            $table->integer('sort_order')->default(1);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotation_items');
    }
};
