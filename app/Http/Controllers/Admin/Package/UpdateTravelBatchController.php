<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use App\Repository\Package\PackageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdateTravelBatchController extends Controller
{
    public function __construct(protected PackageRepository $repository) {}

    public function create(int $id)
    {
        $package = $this->repository->getPackageDetails($id);

        return Inertia::render('admin/package/CreateTravelBatch', compact('package'));
    }

    public function store(Request $request, int $id)
    {
        $validatedData = $request->validate([
            'departure_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:departure_date',
            'price' => 'required|numeric|min:0',
            'is_available' => 'boolean',
            'is_limited' => 'boolean',
        ]);

        $this->repository->createPackageSchedule($id, $validatedData);

        return redirect()->route('admin.packages.details', ['id' => $id])
            ->with('success', 'Travel batch schedule created successfully.');
    }

    public function edit(int $id, int $scheduleId)
    {
        $package = $this->repository->getPackageDetails($id);
        $schedule = $package->schedules()->findOrFail($scheduleId);

        return Inertia::render('admin/package/EditTravelBatch', compact('package', 'schedule'));
    }

    public function update(Request $request, int $id, int $scheduleId)
    {
        $validatedData = $request->validate([
            'departure_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:departure_date',
            'price' => 'required|numeric|min:0',
            'is_available' => 'boolean',
            'is_limited' => 'boolean',
        ]);

        $this->repository->updatePackageSchedule($id, $scheduleId, $validatedData);

        return redirect()->route('admin.packages.details', ['id' => $id])
            ->with('success', 'Travel batch schedule updated successfully.');
    }

    public function destroy(int $id, int $scheduleId)
    {
        $this->repository->deletePackageSchedule($id, $scheduleId);

        return redirect()->route('admin.packages.details', ['id' => $id])
            ->with('success', 'Travel batch schedule deleted successfully.');
    }
}
