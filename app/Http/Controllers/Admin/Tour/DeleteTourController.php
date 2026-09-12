<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Enums\Tour\State;
use App\Enums\Tour\Visibility;
use App\Http\Controllers\Controller;
use App\Models\Tour;
use App\Services\MediaService;
use App\Services\Tour\TourService;
use Illuminate\Http\Request;

class DeleteTourController extends Controller
{
    public function __construct(
        protected TourService $tourService
    ) {
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

        $tour->forceDelete();
        return redirect()->back();
    }
}
