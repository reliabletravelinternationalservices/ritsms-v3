<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quotation extends Model
{
    protected $table = 'quotations';
    protected $fillable = [
        // client
        'client_id',
        'primary_client_name',
        'primary_client_email',
        'primary_client_phone',

        // tour
        'tour_id',
        'tour_name',
        'tour_duration',

        // departure
        'tour_departure_id',
        'departure_date',
        'return_date',
        'total_pax',
        
        // quotation
        'code',
        'slug',
        'status',
        'valid_until',
        'notes',
        'remarks',

        // pricing
        'subtotal',
        'discount_total',
        'tax_total',
        'grand_total',

        'sent_at',
        'viewed_at',
        'accepted_at',

    ];

    public function items()
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class, 'tour_id');
    }

    public function departure(): BelongsTo
    {
        return $this->belongsTo(TourDeparture::class, 'tour_departure_id');
    }
}
