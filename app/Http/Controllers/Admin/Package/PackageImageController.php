<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageImageController extends Controller
{
public function store(Request $request, $id)
{
    // $request->validate([
    //     // Array of files is optional if the user only rearranged or deleted items
    //     'images' => 'nullable|array', 
    //     'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        
    //     // Metadata tracking sequence mapping array
    //     'meta' => 'required|array',
    //     'meta.*.id' => 'required',
    //     'meta.*.is_primary' => 'required|boolean',
    //     'meta.*.order' => 'required|integer',
    //     'meta.*.is_existing' => 'required|boolean',
    // ]);

    return redirect()->back()->with('success', 'Gallery updated successfully.');
}
}
