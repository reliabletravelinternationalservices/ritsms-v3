<?php

test('inbound page renders successfully', function () {
    $response = $this->get(route('client.inbound'));

    $response->assertStatus(200);
});
