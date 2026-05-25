<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;

class DeletePackageGroupController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository) {}

    public function destroy(int $id)
    {
        $this->repository->deleteGroup($id);

        return redirect()->route('admin.packages.groups')->with('success', 'Package group deleted successfully.');
    }
}
