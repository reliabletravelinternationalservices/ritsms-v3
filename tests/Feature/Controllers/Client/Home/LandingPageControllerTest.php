<?php

use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageRepository;
use Database\Seeders\DatabaseSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('renders the landing page with actual repository data', function () {
    // 1. Arrange
    $this->seed(DatabaseSeeder::class);

    $packageRepo = app(PackageRepository::class);
    $destinationRepo = app(DestinationRepository::class);

    $expectedInbound = $packageRepo->getFeaturedInboundPackages();
    $expectedOutbound = $packageRepo->getFeaturedOutboundPackages();
    $expectedDestinations = $destinationRepo->getAllDestinations();

    // 2. Act
    $response = $this->get(route('client.landing'));

    // 3. Assert
    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('client/home/LandingPage')
            ->has('inbound', count($expectedInbound))
            ->has('outbound', count($expectedOutbound))
            ->has('destinations', count($expectedDestinations))
        );
});