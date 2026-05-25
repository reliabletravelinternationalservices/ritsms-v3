<?php
if (!function_exists('build_text_block')) {
    function build_text_block(?array $items): string
    {
        if (!$items || !is_array($items)) return '';

        return implode('|', array_map(function ($item) {
            return trim($item);
        }, $items));
    }
}


if (!function_exists('parse_text_block')) {
    function parse_text_block(array|string $text): array
    {
        if (!$text) return [];

        return array_values(array_filter(array_map(function ($item) {
            return trim($item);
        }, explode('|', $text))));
    }
}



if (!function_exists('build_json_block')) {
    function build_json_block(array $items): string
    {
        return json_encode($items, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    }
}



if (!function_exists('parse_json_block')) {

    function parse_json_block(array|string $item): array
    {
        if (empty($item)) {
            return [];
        }

        return json_decode($item, true, 512, JSON_THROW_ON_ERROR);
    }
}



if (!function_exists('convert_textarea_to_array')) {

    function convert_textarea_to_array(?string $value): array
    {
        if (!$value) {
            return [];
        }

        return collect(
            preg_split("/\n\s*\n/", trim($value))
        )
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->toArray();
    }
}



if (!function_exists('parse_itineraries')) {

   function parse_itineraries(string $value): string
    {
        preg_match_all(
            '/TITLE:\s*(.*?)\s*ACTIVITIES:\s*(.*?)(?=TITLE:|$)/s',
            trim($value),
            $matches,
            PREG_SET_ORDER
        );

        $itineraries = collect($matches)->map(function ($match, $index) {

            $title = trim($match[1]);

            $activities = collect(
                preg_split('/\n\s*\n|\n/', trim($match[2]))
            )
                ->map(fn ($activity) => trim($activity))
                ->filter()
                ->values()
                ->toArray();

            return [
                'day' => $index + 1,
                'title' => $title,
                'activity' => $activities,
            ];
        })->toArray();

        return json_encode($itineraries);
    }
}


if (!function_exists('parse_textarea')) {
    function parse_textarea(string $value) {
        $lines = array_filter(array_map('trim', explode("\n", $value)));
        return json_encode(array_values($lines), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }
}


if (!function_exists('parse_json_array')) {
    function parse_json_array(string $value) {
        return json_decode($value, true, 512, JSON_THROW_ON_ERROR);
    }
}
