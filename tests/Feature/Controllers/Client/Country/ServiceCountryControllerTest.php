<?php

test('service country page can be rendered', function () {
    $response = $this->get(route('client.destination.country'));

    $response->assertStatus(200);
});
