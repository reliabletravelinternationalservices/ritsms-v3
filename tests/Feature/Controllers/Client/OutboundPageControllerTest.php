<?php

test('outbound page renders successfully', function () {
    $response = $this->get(route('client.outbound'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('client/outbound/OutboundPage')
    );
});
