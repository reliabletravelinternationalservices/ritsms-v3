<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuotationItem extends Model
{
    protected $table = 'quotation_items';
    protected $fillable = [
        'quotation_id',
        'item_type',
        'title',
        'description',
        'details',
        'quantity',
        'unit_price',
        'discount',
        'tax',
        'total',
        'remarks',
        'sort_order'
    ];

    public function quotaion()
    {
        return $this->belongsTo(Quotation::class, 'quotation_id');
    }
}
