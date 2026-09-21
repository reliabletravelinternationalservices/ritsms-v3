<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Http\Request;

class DeleteQuotationController extends Controller
{
    public function delete(Request $request, Quotation $quotation)
    {

        $quotation->delete();
        return redirect()->back();
    }


    public function destroy(Request $request, Quotation $quotation)
    {
        if (is_null($quotation->deleted_at)) {
            $quotation->forceDelete();
        }

        $quotation->forceDelete();
        return redirect()->back();
    }
}
