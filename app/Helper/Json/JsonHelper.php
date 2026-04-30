<?php

namespace App\Helper\Json;
class JsonHelper
{
    public function convertToCollection(string $filePath)
    {
        $data = json_decode(file_get_contents($filePath), true);
        $collection = collect();
        foreach ($data as $item) {
            $collection->push($item);
        }
        return $collection;
    }

}