<?php

use App\Models\User;

test('admin login page renders successfully', function () {
    $response = $this->get(route('admin.login'));

    $response->assertStatus(200);
});
