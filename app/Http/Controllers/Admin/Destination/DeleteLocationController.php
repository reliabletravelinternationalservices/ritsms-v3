<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationLocationRepository;
use Illuminate\Http\Request;

class DeleteLocationController extends Controller
{
    public function __construct(protected DestinationLocationRepository $repository) {}
    public function destroy(int $destID, int $id)
    {
        $this->repository->deleteLocation($id);
        $this->repository->deleteLocationImage($id);
        return redirect()->route('admin.destinations.details', $destID)->with('success', 'Location deleted successfully.');
    }
}
