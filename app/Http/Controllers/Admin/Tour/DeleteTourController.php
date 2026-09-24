<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use App\Services\Tour\TourService;
use Illuminate\Http\Request;

class DeleteTourController extends Controller
{
    public function __construct(
        protected TourService $tourService
    ) {}



    public function restore(Request $request, Tour $tour)
    {
        $this->tourService->restore($tour);

        return redirect()->back();
    }

    public function delete(Request $request, Tour $tour)
    {

        $this->tourService->delete($tour);

        return redirect()->back();
    }

    public function destroy(Request $request, Tour $tour)
    {
        if (is_null($tour->deleted_at)) {
            $this->tourService->delete($tour);
        }

        $this->tourService->forceDelete($tour);

        return redirect()->back();
    }
}
