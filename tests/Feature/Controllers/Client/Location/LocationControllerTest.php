<?php

use App\Models\Destination;

test('location page renders successfully', function () {
    $destination = Destination::create([
        'title' => 'Test Destination',
        'description' => 'Location description',
        'country' => 'Test Country',
        'tag' => 'test',
    ]);

    $response = $this->get(route('client.destination.country.destination', ['destination' => $destination->id]));

    $response->assertStatus(200);
});
