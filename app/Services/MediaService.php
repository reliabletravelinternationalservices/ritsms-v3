<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Intervention\Image\Format;
use RuntimeException;

class MediaService
{
    private const IMAGE_SIZES = [
        'thumbnail' => 300,
        'medium' => 800,
        'large' => 1600,
    ];

    private const IMAGE_QUALITY = 85;

    private const VIDEO_MAX_WIDTH = 1920;
    private const VIDEO_MAX_HEIGHT = 1080;

    /**
     * Store an image in multiple WebP sizes.
     *
     * Returns the base file path without the size directory.
     *
     * Example:
     * tours/123/gallery/uuid.webp
     */
    public function storeImage(
        UploadedFile $file,
        string $directory,
        string $disk = 'public',
    ): string {
        $manager = ImageManager::usingDriver(Driver::class);

        $filename = Str::uuid()->toString() . '.webp';

        foreach (self::IMAGE_SIZES as $size => $width) {
            $image = $manager->decodeSplFileInfo($file);

            // Resize proportionally and never upscale.
            $image->scaleDown(width: $width);

            $encoded = $image->encodeUsingFormat(
                Format::WEBP,
                quality: self::IMAGE_QUALITY,
            );

            $path = "{$directory}/{$size}/{$filename}";

            Storage::disk($disk)->put(
                $path,
                $encoded
            );
        }

        return "{$directory}/{$filename}";
    }

    /**
     * Store a single optimized MP4 video.
     *
     * Maximum resolution: 1920x1080.
     *
     * Returns:
     * tours/123/video/uuid.mp4
     */
    public function storeVideo(
        UploadedFile $file,
        string $directory,
        string $disk = 'public',
    ): string {
        $filename = Str::uuid()->toString() . '.mp4';

        $diskRoot = Storage::disk($disk)->path($directory);

        if (! is_dir($diskRoot)) {
            mkdir($diskRoot, 0755, true);
        }

        $inputPath = $file->getRealPath();
        $outputPath = "{$diskRoot}/{$filename}";

        if (! $inputPath || ! file_exists($inputPath)) {
            throw new RuntimeException(
                'Unable to access the uploaded video.'
            );
        }

        $result = Process::run([
            'ffmpeg',
            '-y',
            '-i',
            $inputPath,

            // Never upscale, maximum 1920x1080
            '-vf',
            "scale='if(gt(iw,1920),1920,iw)':'if(gt(ih,1080),1080,ih)':force_original_aspect_ratio=decrease",

            // H.264
            '-c:v',
            'libx264',

            // Quality
            '-crf',
            '24',

            // Good balance between speed and compression
            '-preset',
            'medium',

            // Audio
            '-c:a',
            'aac',
            '-b:a',
            '128k',

            // Better web playback
            '-movflags',
            '+faststart',

            $outputPath,
        ]);

        if ($result->failed()) {
            throw new RuntimeException(
                'Video processing failed: ' . $result->errorOutput()
            );
        }

        return "{$directory}/{$filename}";
    }

    /**
     * Delete all image variants.
     *
     * Example input:
     * tours/123/gallery/uuid.webp
     */
    public function deleteImage(
        string $filePath,
        string $disk = 'public',
    ): void {
        $directory = pathinfo($filePath, PATHINFO_DIRNAME);
        $filename = pathinfo($filePath, PATHINFO_BASENAME);

        foreach (array_keys(self::IMAGE_SIZES) as $size) {
            Storage::disk($disk)->delete(
                "{$directory}/{$size}/{$filename}"
            );
        }
    }

    /**
     * Delete a video.
     */
    public function deleteVideo(
        string $filePath,
        string $disk = 'public',
    ): void {
        Storage::disk($disk)->delete($filePath);
    }

    /**
     * Delete any media file directly.
     */
    public function delete(
        string $filePath,
        string $disk = 'public',
    ): void {
        Storage::disk($disk)->delete($filePath);
    }
}