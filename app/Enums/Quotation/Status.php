<?php

namespace App\Enums\Quotation;

enum Status: string
{
    case DRAFT = 'draft';
    case SENT = 'sent';
    case VIEWED = 'viewed';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
    case EXPIRED = 'expired';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::DRAFT => 'Draft',
            self::SENT => 'Sent',
            self::VIEWED => 'Viewed',
            self::ACCEPTED => 'Accepted',
            self::REJECTED => 'Rejected',
            self::EXPIRED => 'Expired',
            self::CANCELLED => 'Cancelled',
        };
    }
}