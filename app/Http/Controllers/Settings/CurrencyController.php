<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurrencyController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('settings/Currency');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'key'   => ['required', 'string', 'in:usd_to_php_rate'],
            'value' => ['required', 'numeric', 'min:0.0001'],       
            'type'  => ['required', 'string', 'in:number'],
        ]);

        Setting::updateOrCreate(
            ['key' => $validated['key']],
            [
                'value' => $validated['value'],
                'type'  => $validated['type']
            ]
        );

        return redirect()->back()->with('success', 'Currency exchange rate updated successfully.');
    }
}
