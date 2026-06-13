<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\UpdatePackageGroupPinRequest;
use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageGroupRepository;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageGroupPinController extends Controller
{
    public function __construct(
        protected PackageGroupRepository $repository,
        protected PackageRepository $packageRepository,
        protected DestinationRepository $destinationRepository
    ) {}

    public function index(int $id)
    {
        $destinations = $this->destinationRepository->getDestinationDistinctByCountry();
        $group = $this->repository->getPackageGroupByID($id);
        $packages = $this->packageRepository->getPackages();

        return Inertia::render('admin/package/PackageGroupPin', compact('group', 'packages', 'destinations'));
    }

    public function update(UpdatePackageGroupPinRequest $request, int $id)
    {
        $validated = $request->validated();
        $this->repository->updateGroupPinnedPackages($id, $validated['pinned_package_ids']);

        return redirect()->route('admin.packages.groups.pin', ['id' => $id])->with('success', 'Pinned package order updated successfully.');
    }
}
