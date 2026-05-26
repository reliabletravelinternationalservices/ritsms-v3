<?php

namespace App\Http\Controllers\Admin\Destination;

use App\Http\Controllers\Controller;
use App\Repository\Destination\DestinationRepository;
use Illuminate\Http\Request;

class DeleteDestinationController extends Controller
{
    public function __construct(protected DestinationRepository $repository){}

    public function destroy(int $id)
    {
        $this->repository->deleteDestination($id);
        $this->repository->deleteDestinationImage($id);

        return redirect()->route('admin.destinations')->with('success', 'Destination deleted successfully!');
    }
}
