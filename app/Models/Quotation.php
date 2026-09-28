<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Quotation extends Model
{
    use SoftDeletes;
    protected $table = 'quotations';
    protected $fillable = [
        // client
        'client_id',
        'primary_client_code',
        'primary_client_name',
        'primary_client_email',
        'primary_client_phone',

        // tour
        'tour_id',
        'tour_code',
        'tour_name',
        'tour_duration',

        // departure
        'tour_departure_id',
        'departure_date',
        'return_date',
        'departure_time',
        'return_time',
        'airline_name',
        'departure_flight_no',
        'return_flight_no',
        'tour_date_price',
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

    public function generateSlug(): string
    {
        do {
            $slug = Str::lower(Str::random(20));
        } while (
            static::withTrashed()
                ->where('slug', $slug)
                ->where('id', '!=', $this->id)
                ->exists()
        );

        return $slug;
    }

    public function generateCode(): string
    {
        do {
            $code = 'QT-' . now()->format('Ymd') . '-' . random_int(1000, 9999);
        } while (self::where('code', $code)->exists());

        return $code;
    }



    protected static function booted(): void
    {
        static::creating(function (Quotation $quotation) {
            $quotation->code = $quotation->generateCode();
            $quotation->slug = $quotation->generateSlug();
        });
        
    }
}
