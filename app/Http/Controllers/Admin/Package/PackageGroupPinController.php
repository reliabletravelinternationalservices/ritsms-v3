<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageGroupPinController extends Controller
{
    public function __construct(
        protected PackageGroupRepository $repository,
        protected PackageRepository $packageRepository
    ) {}

    public function index(int $id)
    {
        $group = $this->repository->getPackageGroupByID($id);
        $packages = $this->packageRepository->getPackages();

        return Inertia::render('admin/package/PackageGroupPin', compact('group', 'packages'));
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'pinned_package_ids' => ['required', 'array'],
            'pinned_package_ids.*.package_id' => ['required', 'integer', 'exists:packages,id'],
            'pinned_package_ids.*.order_number' => ['required', 'integer'],
        ]);

        $group = $this->repository->getPackageGroupByID($id);
        $syncData = collect($validated['pinned_package_ids'])->mapWithKeys(fn ($item) => [
            $item['package_id'] => ['order_number' => $item['order_number']],
        ])->toArray();

        $group->packages()->sync($syncData);

        return redirect()->route('admin.packages.groups.pin', ['id' => $id])->with('success', 'Pinned package order updated successfully.');
    }
}
