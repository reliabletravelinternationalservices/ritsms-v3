<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageGroupRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageGroupDisplayController extends Controller
{
    public function __construct(protected PackageGroupRepository $repository){}
    public function index()
    {
        $groups = $this->repository->getAllGroups();

        return Inertia::render('admin/package/PackageGroupDisplay', [
            'groups' => $groups->toArray(),
        ]);
    }
}
