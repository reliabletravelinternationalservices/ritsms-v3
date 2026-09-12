<?php

namespace App\Enums;

enum SettingKey: string
{
    case EXCHANGE_RATE_AUTO_FETCH = 'exchange_rate_auto_fetch';
    case USD_TO_PHP_RATE = 'usd_to_php_rate';
}
