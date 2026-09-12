<?php

test('admin forgot password page renders successfully', function () {
    $response = $this->get(route('admin.forgot.password'));

    $response->assertStatus(200);
});
