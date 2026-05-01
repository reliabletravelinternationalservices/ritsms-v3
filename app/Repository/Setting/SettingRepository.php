<?php

namespace App\Repository\Setting;

use App\Models\Setting;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class SettingRepository
{
    public function getSettings(): Collection
    {
        return Setting::all();
    }

    public function getSetting(string $key)
    {
        return Setting::query()->where('key', $key)->first();
    }

    public function updateSetting(string $key, string $value)
    {
        return Setting::query()->where('key', $key)->update(['value' => $value]);
    }

    public function createSetting(string $key, string $value, string $type = 'string')
    {
        return DB::transaction(function () use ($key, $value, $type) {
            return Setting::create(['key' => $key, 'value' => $value, 'type' => $type]);
        });
    }

    public function createManySettings(array $settings)
    {
        foreach ($settings as $setting) {
            $this->createSetting($setting['key'], $setting['value'], $setting['type']);
        }
    }
}
