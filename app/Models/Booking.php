<?php

namespace App\Models;

use App\Enums\Booking\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Booking extends Model
{
    use SoftDeletes;
    protected $table = 'bookings';
    protected $guarded = ['id'];
    protected $fillable = [
        // References
        'client_id',
        'quotation_id',

        // Booking identification
        'code',
        'slug',
        'status',

        // Client snapshot
        'primary_client_code',
        'primary_client_name',
        'primary_client_email',
        'primary_client_phone',

        // Tour references
        'tour_id',
        'tour_departure_id',    

        // Tour snapshot
        'tour_code',
        'tour_name',
        'tour_duration',

        // Travel dates
        'departure_date',
        'return_date',

        // Flight / travel details
        'departure_time',
        'return_time',
        'airline_name',
        'departure_flight_no',
        'return_flight_no',

        // Travelers
        'total_pax',

        // Pricing snapshot
        'subtotal',
        'discount_total',
        'tax_total',
        'grand_total',

        // Notes
        'remarks',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'status' => Status::class,
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }



    // public function payments()
    // {
    //     return $this->hasMany(Payment::class, 'booking_id', 'id');
    // }

    // public function refunds()
    // {
    //     return $this->hasMany(Refund::class, 'booking_id', 'id');
    // }


    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class, 'tour_id');
    }

    public function departure(): BelongsTo
    {
        return $this->belongsTo(TourDeparture::class, 'tour_departure_id');
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class, 'quotation_id');
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
            $code = 'BK-' . now()->format('Ymd') . '-' . random_int(1000, 9999);
        } while (self::where('code', $code)->exists());

        return $code;
    }



    protected static function booted(): void
    {
        static::creating(function (Booking $booking) {
            $booking->code = $booking->generateCode();
            $booking->slug = $booking->generateSlug();
        });
        
    }
}
