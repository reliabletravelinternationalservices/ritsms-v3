<?php


use Database\Seeders\DatabaseSeeder;

test('renders the landing page with actual repository data', function () {
    // 1. Arrange
    $this->seed(DatabaseSeeder::class);

    // 2. Act
    $response = $this->get('/');
    
    $response->assertStatus(200);
});