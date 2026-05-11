<?php

use App\Repository\Destination\DestinationRepository;
use App\Repository\Package\PackageRepository;
use Database\Seeders\DatabaseSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('renders the landing page with actual repository data', function () {
    // 1. Arrange
    $this->seed(DatabaseSeeder::class);

    // 2. Act
    $response = $this->get('/');
    
    $response->assertStatus(200);
});