<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\User\Role;
use App\Mail\ResetPasswordMail;
use App\Mail\VerifyEmployeeEmail;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'email',
        'password',
        'display_name',
        'phone',
        'is_active',
        'password',
        'role',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'role' => Role::class,
        ];
    }




    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($user) {
            if (!empty($user->code)) {
                return;
            }

            $user->code = self::generateCode($user->role);
        });
    }


    private static function generateCode(Role $type): string
    {
        if ($type->isAdmin()) {
            $prefix = 'ADM';
        } elseif ($type->isAgent()) {
            $prefix = 'AGT';
        } else {
            $prefix = 'CLI';
        }

        $date = now()->format('Ymd');
        $randomNumber = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);

        return "{$prefix}-{$date}-{$randomNumber}";
    }


    public function sendEmailVerificationNotification()
    {
        $verificationUrl = URL::temporarySignedRoute(
            'admin.verification.verify',
            now()->addMinutes(60),
            [
                'id' => $this->getKey(),
                'hash' => sha1($this->getEmailForVerification()),
            ]
        );


        try {
            Mail::to($this->email)->send(
                new VerifyEmployeeEmail($this->name, $verificationUrl)
            );
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
        }
    }


    public function adminVerificationCooldownKey(): string
    {
        return "admin-email-verification:{$this->getKey()}:sent-until";
    }

    public function adminVerificationCooldownRemainingSeconds(): int
    {
        $expiresAt = Cache::get($this->adminVerificationCooldownKey());

        if (! $expiresAt) {
            return 0;
        }

        $expiresAt = $expiresAt instanceof Carbon ? $expiresAt : Carbon::parse($expiresAt);

        return max((int) now()->diffInSeconds($expiresAt, false), 0);
    }


    public function sendAccountPasswordResetNotification()
    {
        $token = app('auth.password.broker')->createToken($this);
        $resetUrl = url(route('admin.forgot.password.reset', ['token' => $token, 'email' => $this->email], false));

        Mail::to($this->email)->send(
            new ResetPasswordMail($this, $resetUrl)
        );
    }



    public function conversationMessages()
    {
        return $this->hasMany(ConversationMessage::class);
    }



    public function conversationParticipants()
    {
        return $this->morphMany(
            ConversationParticipant::class,
            'participant'
        );
    }

    public function conversations()
    {
        return $this->hasManyThrough(
            Conversation::class,
            ConversationParticipant::class,
            'participant_id',
            'id',
            'id',
            'conversation_id'
        )->where('conversation_participants.participant_type', $this->getMorphClass());
    }
}
