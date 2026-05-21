<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\PackageImageRequest;
use App\Models\Media;
use App\Models\Package;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PackageImageController extends Controller
{
    public function __construct(protected PackageRepository $repository) {}
    public function store(PackageImageRequest $request, int $id)
    {

        if ($request->hasFile('image')) {
            $media = $this->repository->storePackageImage($id, $request->validated());
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
