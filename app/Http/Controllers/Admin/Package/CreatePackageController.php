<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Package\CreatePackageRequest;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use SebastianBergmann\CodeUnit\FunctionUnit;

class CreatePackageController extends Controller
{
    public function __construct(protected PackageRepository $repository){}
    public function index()
    {
        return Inertia::render('admin/package/CreatePackage');
    }

    public function store(CreatePackageRequest $request)
    {
        $this->repository->createPackage($request->validated());
        return redirect()->intended(route('admin.packages', absolute: true));
    }
}
