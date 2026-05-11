<?php

// use App\Models\User;
// use Database\Seeders\DatabaseSeeder;

// test('Admin login screen can be rendered', function () {
//     $response = $this->get(route('admin.login', absolute: false));

//     $response->assertStatus(200);
// });

// test('users can authenticate using the login screen', function () {
//     app(DatabaseSeeder::class)->run();

//     $user = User::all()->first();

//     $response = $this->post(route('admin.login.store'), [
//         'email' => $user->email,
//         'password' => 'password',
//     ]);

//     $this->assertAuthenticated();
//     $response->assertRedirect(route('admin.dashboard', absolute: false));
// });

// test('users can not authenticate with invalid password', function () {
//     $user = User::factory()->create();

//     $this->post('/login', [
//         'email' => $user->email,
//         'password' => 'wrong-password',
//     ]);

//     $this->assertGuest();
// });

// test('users can logout', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->post('/logout');

//     $this->assertGuest();
//     $response->assertRedirect('/');
// });