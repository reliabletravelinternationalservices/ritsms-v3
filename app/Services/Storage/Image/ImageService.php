<?php

namespace App\Services;

use App\Enums\Storage\Image\ImageDirectory;
use App\Enums\Storage\Image\ImageSize;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Encoders\AutoEncoder;

class ImageService
{
    protected string $disk = 'public';

    /**
     * Upload and process image.
     */
    public function upload(
        UploadedFile $file,
        ImageDirectory $directory,
        bool $generateSizes = true,
        string $format = 'webp',
    ): array {
        $filename = Str::uuid()->toString();

        $basePath = $directory->path();

        $image = Image::read($file);

        $paths = [];

        // Original / Main image
        $paths['original'] = $this->saveImage(
            $image,
            "{$basePath}/{$filename}.{$format}",
            $format
        );

        // Generate different sizes
        if ($generateSizes) {
            foreach (ImageSize::cases() as $size) {
                [$width, $height] = $size->dimensions();

                $resized = Image::read($file)
                    ->scaleDown($width, $height);

                $paths[$size->value] = $this->saveImage(
                    $resized,
                    "{$basePath}/{$filename}_{$size->value}.{$format}",
                    $format
                );
            }
        }

        return [
            'filename' => $filename,
            'directory' => $basePath,
            'paths' => $paths,
        ];
    }

    /**
     * Save encoded image to storage.
     */
    protected function saveImage(
        $image,
        string $path,
        string $format
    ): string {
        $encoded = match ($format) {
            'webp' => $image->encode(new WebpEncoder(quality: 85)),
            default => $image->encode(new AutoEncoder(quality: 85)),
        };

        Storage::disk($this->disk)->put($path, (string) $encoded);

        return $path;
    }

    /**
     * Delete image and all generated sizes.
     */
    public function delete(?string $filename, ImageDirectory $directory): void
    {
        if (!$filename) {
            return;
        }

        $basePath = $directory->path();

        $paths = [
            "{$basePath}/{$filename}.webp",
        ];

        foreach (ImageSize::cases() as $size) {
            $paths[] = "{$basePath}/{$filename}_{$size->value}.webp";
        }

        Storage::disk($this->disk)->delete($paths);
    }

    /**
     * Delete an image by its stored path.
     */
    public function deletePath(?string $path): void
    {
        if ($path) {
            Storage::disk($this->disk)->delete($path);
        }
    }

    /**
     * Get public URL.
     */
    public function url(?string $path): ?string
    {
        return $path
            ? Storage::disk($this->disk)->url($path)
            : null;
    }
}