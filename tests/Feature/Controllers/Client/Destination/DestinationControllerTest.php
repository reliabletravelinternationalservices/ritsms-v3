<?php

use App\Models\Destination;

test('destination page can be rendered', function () {
    $response = $this->get('/destination');

    $response->assertStatus(200);
});

test('service country page can be rendered', function () {

    $response = $this->get(route('client.destination.countries'));

    $response->assertStatus(200);
});

test('location page renders successfully', function () {
    $destination = Destination::create([
        'title' => 'Test Destination',
        'description' => 'Location description',
        'country' => 'Test Country',
        'tag' => 'test',
    ]);

    $response = $this->get(route('client.destination.country', ['slug' => $destination->slug]));

    $response->assertStatus(200);
});
