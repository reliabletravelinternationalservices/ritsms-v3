<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\CreatePackageGroupRequest;
use App\Repository\Package\PackageGroupRepository;
use Inertia\Inertia;

class CreatePackageGroupController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository) {}

    public function index()
    {
        return Inertia::render('admin/package/CreatePackageGroup');
    }

    public function store(CreatePackageGroupRequest $request)
    {
        $validatedData = $request->validated();

        $group = $this->repository->createGroup($validatedData);

        if ($request->hasFile('image')) {
            $this->repository->storePackageGroupImage($group->id, $request->validated());
        }

        return redirect()->route('admin.packages.groups')->with('success', 'Package group created successfully.');
    }
}
