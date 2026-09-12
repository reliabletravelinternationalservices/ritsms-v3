<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;

class DeletePackageController extends Controller
{
    public function __construct(protected PackageRepository $repository) {}

    public function destroy(int $id) {
        $this->repository->deletePackage($id);
        return redirect()->route('admin.packages')->with('success', 'Package deleted successfully.');
    }
}
