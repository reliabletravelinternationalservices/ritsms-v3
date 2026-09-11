<?php

namespace App\Http\Controllers\Admin\Quotation;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateQuotationController extends Controller
{
    public function create()
    {
        $clients = Client::latest()->get();
        return Inertia::render('admin/quotation/CreateQuotation', compact('clients'));
    }
}
