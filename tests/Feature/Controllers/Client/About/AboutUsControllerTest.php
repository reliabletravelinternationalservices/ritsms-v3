<?php

test('about us page can be rendered', function () {
    $response = $this->get('/about');

    $response->assertStatus(200);
});
