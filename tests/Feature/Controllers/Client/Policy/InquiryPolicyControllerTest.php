<?php

test('inquiry policy page renders successfully', function () {
    $response = $this->get(route('client.inquiry.policy'));

    $response->assertStatus(200);
});
