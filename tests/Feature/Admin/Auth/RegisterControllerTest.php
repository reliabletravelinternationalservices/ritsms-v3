<?php

test('admin register page renders successfully', function () {
    $response = $this->get(route('admin.register'));

    $response->assertStatus(200);
});
