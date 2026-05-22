<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\CreatePackageGroupRequest;
use App\Http\Requests\Admin\Package\EditPackageGroupRequest;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EditPackageGroupController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository) {}

    public function index(int $id)
    {
        $group = $this->repository->getPackageGroupByID($id);

        return Inertia::render('admin/package/EditPackageGroup', ['group' => $group]);
    }

    public function update(EditPackageGroupRequest $request, int $id)
    {
        $validatedData = $request->validated();

        if (! $request->hasFile('image')) {
            unset($validatedData['image']);
            Storage::delete($this->repository->getPackageGroupByID($id)->image);
            
        }

        $this->repository->updateGroup($id, $validatedData);

        return redirect()->route('admin.packages.groups.edit', ['id' => $id])
            ->with('success', 'Package group updated successfully.');
    }
}
