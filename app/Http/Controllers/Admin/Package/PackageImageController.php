<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\PackageImageRequest;
use App\Http\Requests\Admin\Package\UpdatePackageImageRequest;
use App\Repository\Package\PackageRepository;

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

    public function update(UpdatePackageImageRequest $request, int $id)
    {
        if (! empty($request->deleted_ids)) {
            $this->repository->deletePackageImages($id, $request->validated('deleted_ids'));
        }

        if (! empty($request->meta)) {
            $this->repository->updatePackageImageMeta($id, $request->validated('meta'));
        }

        return redirect()->back()->with('success', 'Package gallery synced perfectly.');
    }
}
