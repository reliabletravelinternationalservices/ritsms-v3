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



function parse_itineraries(string $value): string
{
    $lines = preg_split('/\r\n|\r|\n/', trim($value));

    $itineraries = [];
    $current = [];

    foreach ($lines as $line) {

        $line = trim($line);

        // treat empty line OR image marker line as separator
        if ($line === '' || str_starts_with(strtolower($line), 'image')) {

            if (!empty($current)) {
                $itineraries[] = $current;
                $current = [];
            }

            continue;
        }

        $current[] = $line;
    }

    // push last block
    if (!empty($current)) {
        $itineraries[] = $current;
    }

    $result = collect($itineraries)->map(function ($block, $index) {

        $title = array_shift($block); // first line = title

        return [
            'day' => $index + 1,
            'title' => $title,
            'activity' => array_values(array_filter($block)),
        ];
    })->values()->toArray();

    return json_encode($result);
}


if (!function_exists('parse_textarea')) {
    function parse_textarea(string $value) {
        $lines = array_filter(array_map('trim', explode("\n", $value)));
        return json_encode(array_values($lines), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }
}


if (!function_exists('parse_json_array')) {
    function parse_json_array(?string $value): array
    {
        try {
            return json_decode($value ?? '[]', true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            return [];
        }
    }
}
