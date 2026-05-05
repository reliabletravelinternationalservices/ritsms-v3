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