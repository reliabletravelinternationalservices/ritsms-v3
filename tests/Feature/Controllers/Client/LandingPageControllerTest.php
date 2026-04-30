<?php

test('landing page can be rendered', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('destination page can be rendered', function () {
    $response = $this->get('/destination');

    $response->assertStatus(200);
});
