<?php

test('destination page can be rendered', function () {
    $response = $this->get('/destination');

    $response->assertStatus(200);
});
