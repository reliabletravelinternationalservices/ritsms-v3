<?php

test('contact page can be rendered', function () {
    $response = $this->get('/contact');

    $response->assertStatus(200);
});
