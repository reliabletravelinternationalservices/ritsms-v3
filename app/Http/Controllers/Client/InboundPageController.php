<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Client\InboundPageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class InboundPageController extends Controller
{
    public function __construct(
        protected InboundPageService $service
    ) {}

    public function index()
    {
        $this->service->initializeRootPageSEO();
        return Inertia::render('client/inbound/InboundPage', $this->service->getInboundPageData());
    }
}
