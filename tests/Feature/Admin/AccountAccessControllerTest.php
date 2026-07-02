<?php

test('admin access denied page renders successfully', function () {
    $response = $this->get(route('admin.access.denied'));

    $response->assertStatus(200);
});
