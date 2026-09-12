<?php

namespace App\Console\Commands;

use App\Enums\SettingKey;
use App\Models\Setting;
use App\Services\ExchangeRateService;
use Illuminate\Console\Command;

class UpdateExchangeRate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rate:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the USD to PHP exchange rate';

    /**
     * Execute the console command.
     */
    public function handle(ExchangeRateService $service)
    {
        $auto = Setting::getValue(SettingKey::EXCHANGE_RATE_AUTO_FETCH->value);
        if ($auto === 'false') {
            $this->info('Auto fetch disabled.');
            return;
        }

        $rate = $service->fetchUsdToPhp();

        if ($rate) {
            Setting::where('key', SettingKey::USD_TO_PHP_RATE->value)->update([
                'value' => $rate,
            ]);
            $this->info("Rate updated: {$rate}");
        }
    }

}
