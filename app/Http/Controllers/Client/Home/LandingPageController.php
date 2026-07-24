<?php

namespace App\Http\Controllers\Client\Home;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Package;
use App\Models\PackageGroup;
use App\Services\Client\LandingService;
use Inertia\Inertia;
use Illuminate\Support\Str;
class LandingPageController extends Controller
{
    public function __construct(protected LandingService $service) {}


    public function index()
    {
        $this->service->initializeSEO();
        return Inertia::render('client/home/LandingPage');
    }


    // public function updateTableData()
    // {
    //     $count = 0;

    //     // Package::chunkById(100, function ($packages) use (&$count) {
    //     //     foreach ($packages as $package) {
    //     //         do {
    //     //             $base = Str::limit(Str::slug($package->name), 50, '');
    //     //             $slug = $base . '-' . Str::lower(Str::random(6));
    //     //         } while (
    //     //             Package::where('slug', $slug)
    //     //                 ->where('id', '!=', $package->id)
    //     //                 ->exists()
    //     //         );

    //     //         $package->updateQuietly([
    //     //             'slug' => $slug,
    //     //         ]);

    //     //         $count++;
    //     //     }
    //     // });

        
    //     // Destination::chunkById(100, function ($destinations) use (&$count) {
    //     //     foreach ($destinations as $destination) {
    //     //         do {
    //     //             $base = Str::limit(Str::slug($destination->country), 50, '');
    //     //             $slug = $base . '-' . Str::lower(Str::random(6));
    //     //         } while (
    //     //             Destination::where('slug', $slug)
    //     //                 ->where('id', '!=', $destination->id)
    //     //                 ->exists()
    //     //         );

    //     //         $destination->updateQuietly([
    //     //             'slug' => $slug,
    //     //         ]);

    //     //         $count++;
    //     //     }
    //     // });
        
        
    //     PackageGroup::chunkById(100, function ($packageGroups) use (&$count) {
    //         foreach ($packageGroups as $packageGroup) {
    //             do {
    //                 $base = Str::limit(Str::slug($packageGroup->title), 50, '');
    //                 $slug = $base . '-' . Str::lower(Str::random(6));
    //             } while (
    //                 PackageGroup::where('slug', $slug)
    //                     ->where('id', '!=', $packageGroup->id)
    //                     ->exists()
    //             );

    //             $packageGroup->updateQuietly([
    //                 'slug' => $slug,
    //             ]);

    //             $count++;
    //         }
    //     });
    //     return response()->json([
    //         'message' => 'Package Group slugs regenerated successfully.',
    //         'updated' => $count,
    //     ]);
    // }
}
