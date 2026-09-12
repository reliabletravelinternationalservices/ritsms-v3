<?php

namespace App\Enums\Client;

enum Status: string
{
    case NEW = 'new';
    case CONTACTED = 'contacted';
    case QUALIFIED = 'qualified';
    case QUOTATION_SENT = 'quotation_sent';
    case BOOKED = 'booked';
    case COMPLETED = 'completed';
    case UNRESPONSIVE = 'unresponsive';
    case CANCELLED = 'cancelled';
    case DISQUALIFIED = 'disqualified';

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'New',
            self::CONTACTED => 'Contacted',
            self::QUALIFIED => 'Qualified',
            self::QUOTATION_SENT => 'Quotation Sent',
            self::BOOKED => 'Booked',
            self::COMPLETED => 'Completed',
            self::UNRESPONSIVE => 'Unresponsive',
            self::CANCELLED => 'Cancelled',
            self::DISQUALIFIED => 'Disqualified',
        };
    }
}