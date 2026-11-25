<?php

namespace App\Services\Storage;

use App\Enums\Storage\StorageLocation;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class FileStorageService
{
    public function store(
        UploadedFile $file,
        StorageLocation $location,
        string $directory
    ): array {
        $disk = $location->disk();

        $filename = Str::uuid() . '.' . $file->guessExtension();

        $path = Storage::disk($disk)->putFileAs(
            $directory,
            $file,
            $filename
        );

        if (! $path) {
            throw new RuntimeException('Unable to store uploaded file.');
        }

        return [
            'disk' => $disk,
            'path' => $path,
            'name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];
    }

    public function delete(string $disk, string $path): bool
    {
        return Storage::disk($disk)->delete($path);
    }

    public function exists(string $disk, string $path): bool
    {
        return Storage::disk($disk)->exists($path);
    }

    public function url(string $disk, string $path): string
    {
        return Storage::disk($disk)->url($path);
    }

    public function download(
        string $disk,
        string $path,
        ?string $name = null
    ) {
        return Storage::disk($disk)->download($path, $name);
    }
}
