<?php

namespace App\Models;

use App\Enums\Client\Gender;
use App\Enums\Client\Source;
use App\Enums\Client\Status;
use App\Enums\Client\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property Status|null $status
 * @property Source|null $source
 * @property Type|null $type
 * @property Gender|null $gender
 */
class Client extends Model
{
    use SoftDeletes;

    protected $table = 'clients';

    protected $fillable = [
        'code',
        'slug',
        'name',
        'email',
        'phone',
        'address',
        'type',
        'status',
        'source',
        'gender',
        'accept_marketing',
        'website_link',
        'facebook_link',
        'last_contacted_at',
        'notes',
    ];

    protected $casts = [
        'status' => Status::class,
        'source' => Source::class,
        'type' => Type::class,
        'gender' => Gender::class,
        'accept_marketing' => 'boolean',
        'last_contacted_at' => 'datetime',
    ];





      // other
    public function generateSlug(): string
    {
        $baseSlug = Str::limit(
            Str::slug($this->name),
            20,
            ''
        );

        $slug = $baseSlug;
        $counter = 2;

        while (
            static::where('slug', $slug)
                ->where('id', '!=', $this->id)
                ->exists()
        ) {
            $suffix = "-{$counter}";
            $slug = Str::limit(
                $baseSlug,
                20 - strlen($suffix),
                ''
            ) . $suffix;

            $counter++;
        }

        return $slug;
    }

    public function generateCode(): string
    {
        do {
            $code = 'CT-' . now()->format('Ymd') . '-' . random_int(1000, 9999);
        } while (self::where('code', $code)->exists());

        return $code;
    }



    protected static function booted(): void
    {
        static::creating(function (Client $client) {
            $client->code = $client->generateCode();
            $client->slug = $client->generateSlug();
        });
        
    }
}