<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;

class FeaturePackageGroupController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository) {}

    public function toggle(int $id)
    {
        $group = $this->repository->toggleGroupFeatured($id);

        return redirect()->route('admin.packages.groups')->with(
            'success',
            $group->is_featured ? 'Package group marked featured.' : 'Featured label removed.'
        );
    }
}
