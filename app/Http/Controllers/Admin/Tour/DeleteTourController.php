<?php

namespace App\Http\Controllers\Admin\Tour;

use App\Enums\Tour\State;
use App\Enums\Tour\Visibility;
use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Http\Request;

class DeleteTourController extends Controller
{
    public function delete(Request $request, Tour $tour)
    {
        $tour->update([
            'state' => State::ARCHIVED->value,
            'visibility' => Visibility::PRIVATE->value
        ]);
        $tour->delete();
    }


    public function destroy(Request $request, Tour $tour)
    {
        $tour->forceDelete();
    } 
}
