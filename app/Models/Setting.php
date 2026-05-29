<?php

namespace App\Models;

use App\Enums\SettingType;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'settings';

    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    public function getCastedValueAttribute()
    {
        return match ($this->type) {
            SettingType::NUMBER->value => (float) $this->value,
            SettingType::INT->value => (int) $this->value,
            SettingType::BOOLEAN->value => filter_var($this->value, FILTER_VALIDATE_BOOLEAN),
            SettingType::JSON->value => json_decode($this->value, true),
            default => $this->value,
        };
    }

    public static function getValue(string $key)
    {
        return static::where('key', $key)->first()?->casted_value;
    }
}
