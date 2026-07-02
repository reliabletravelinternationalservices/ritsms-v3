<?php

use App\Http\Requests\Client\Inquiry\InquiryRequest;
use App\Models\User;

test('inquiry success page renders successfully when session flag is set', function () {
    $this->withSession(['isInquired' => true])->get(route('client.inquiry.success'))->assertStatus(200);
});

test('inquiry success page redirects home when session flag is missing', function () {
    $response = $this->get(route('client.inquiry.success'));

    $response->assertRedirect(route('client.landing'));
});
