<?php

namespace App\Actions\Tour;

class GenerateTourCode
{
    public function execute(): string
    {
        do {
            $code = sprintf(
                'TR-%s-%05d',
                now()->format('Ymd'),
                random_int(0, 99999)
            );
        } while (\App\Models\Tour::where('code', $code)->exists());

        return $code;
    }
}
