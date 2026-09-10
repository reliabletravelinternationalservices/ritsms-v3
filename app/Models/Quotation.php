<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quotation extends Model
{
    protected $table = 'quotations';
    protected $fillable = [
        'client_id',
        'code',
        'slug',
        'status',
        'valid_until',
        'subtotal',
        'discount_total',
        'tax_total',
        'grand_total',
        'notes',
        'sent_at',
        'viewed_at',
        'accepted_at'
    ];

    public function items()
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    } 
}
