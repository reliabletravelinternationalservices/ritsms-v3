<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PackageImageController extends Controller
{
    public function store(Request $request, int $id)
    {
        // 1. Validate that we are strictly receiving an image file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp',
        ]);

        // Find the parent model instance to verify it exists
        $package = Package::findOrFail($id);

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            // 2. Generate pathing and store file on the public disk
            // This creates a directory structure like: storage/app/public/packages/{id}
            $folderPath = "upload/package/{$id}";
            $path = $file->store($folderPath, 'public');

            // 3. Calculate next sequencing index number dynamically
            $nextOrderNumber = Media::where('mediable_type', $package->getMorphClass())
                ->where('mediable_id', $id)
                ->max('order_number') + 1;

            // 4. Create the Polymorphic Media DB Entry Row Record
            $media = Media::create([
                'mediable_id' => $id,
                'mediable_type' => $package->getMorphClass(),
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'alt_text' => $file->getClientOriginalName(),
                'url' => Storage::url($path), // Clean alternative that resolves IDE method errors
                'disk' => 'local',
                'type' => 'image',
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'order_number' => $nextOrderNumber,
                'is_primary' => false,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully.',
                'media' => $media,
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'No valid image file detected.',
        ], 400);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'deleted_ids' => 'nullable|array',
            'deleted_ids.*' => 'integer',
            'meta' => 'nullable|array',
            'meta.*.id' => 'required_with:meta|integer',
            'meta.*.is_primary' => 'required_with:meta|boolean',
            'meta.*.order' => 'required_with:meta|integer',
        ]);

        $mediableType = (new Package)->getMorphClass();

        DB::transaction(function () use ($request, $id, $mediableType) {
            // 1. Process deletions if any exist
            if (! empty($request->deleted_ids)) {
                $mediaToDelete = Media::where('mediable_type', $mediableType)
                    ->where('mediable_id', $id)
                    ->whereIn('id', $request->deleted_ids)
                    ->get();

                foreach ($mediaToDelete as $file) {
                    $disk = $file->disk ?? 'public';

                    if ($file->file_path && Storage::disk($disk)->exists($file->file_path)) {
                        Storage::disk($disk)->delete($file->file_path);
                    } elseif ($disk !== 'public' && $file->file_path && Storage::disk('public')->exists($file->file_path)) {
                        Storage::disk('public')->delete($file->file_path);
                    }

                    $file->delete();
                }
            }

            // 2. Batch update new sequence ordering indices and primary flags
            if (! empty($request->meta)) {
                foreach ($request->meta as $item) {
                    Media::where('mediable_type', $mediableType)
                        ->where('mediable_id', $id)
                        ->where('id', $item['id'])
                        ->update([
                            'is_primary' => $item['is_primary'],
                            'order_number' => $item['order'],
                        ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Package gallery synced perfectly.');
    }
}
