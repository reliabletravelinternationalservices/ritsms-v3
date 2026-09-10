<?php

namespace App\Http\Controllers\Admin\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class DeleteClientController extends Controller
{
    public function delete(Request $request, Client $client)
    {
        $client->delete();
        return redirect()->back();
    }

    public function destroy(Request $request, Client $client)
    {
        $client->forceDelete();
        return redirect()->back();
    }
}
