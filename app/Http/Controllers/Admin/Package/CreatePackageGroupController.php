<?php

namespace App\Http\Controllers\Admin\Package;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreatePackageGroupController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/package/CreatePackageGroup');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'include_as_outbound' => 'required|boolean',
            'include_as_inbound' => 'required|boolean',
            'is_featured' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp'
        ]);

        // Handle the image file if it exists
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('package_groups', 'public'); // Store in public disk under package_groups directory
            $validatedData['image_path'] = $path; // Save the path to the database
        }
        

        // Create the package group using the validated data

        
        // You would typically use a repository or model here to save to the database
        // For example: $this->repository->createGroup($validatedData);

        return redirect()->route('admin.packages.groups')->with('success', 'Package group created successfully.');
    }
}
