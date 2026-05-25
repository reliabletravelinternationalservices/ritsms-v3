<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\EditPackageRequest;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditPackageController extends Controller
{
    public function __construct(protected PackageRepository $repository){}
    public function index(int $id)
    {
        $package = $this->repository->getPackageDetails($id);
        return Inertia::render('admin/package/EditPackage', compact('package'));
    }


    public function update(EditPackageRequest $request, int $id)
    {
        $data = $request->validated();
        $this->repository->updatePackage($id, $data);

        // After updating, redirect back to the package details or list page
        return redirect()->route('admin.packages.details', ['id' => $id])
            ->with('success', 'Package updated successfully.');
    }
}
