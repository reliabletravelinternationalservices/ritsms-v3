<?php

use App\Enums\Convo\Type;
use App\Enums\User\Role;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function (): void {
    $this->member = User::create([
        'code' => 'ADM-'.fake()->unique()->numerify('########'),
        'email' => fake()->unique()->safeEmail(),
        'password' => 'password',
        'display_name' => fake()->name(),
        'role' => Role::ADMIN,
    ]);
    $this->conversation = Conversation::create([
        'type' => Type::GROUP,
        'created_by_type' => $this->member->getMorphClass(),
        'created_by_id' => $this->member->id,
    ]);

    $this->conversation->participants()->create([
        'participant_type' => $this->member->getMorphClass(),
        'participant_id' => $this->member->id,
    ]);
});

it('updates a group conversation name and avatar', function (): void {
    Storage::fake('public');

    $response = $this->actingAs($this->member)->post(
        route('convo.update', ['convo' => $this->conversation]),
        [
            'name' => 'Updated group',
            'avatar' => UploadedFile::fake()->image('group.png'),
        ]
    );

    $response
        ->assertSuccessful()
        ->assertJsonPath('data.name', 'Updated group');

    $avatarPath = $this->conversation->fresh()->avatar;

    expect($avatarPath)->not->toBeNull();
    Storage::disk('public')->assertExists($avatarPath);

    $this->actingAs($this->member)->post(
        route('convo.update', ['convo' => $this->conversation]),
        [
            'name' => 'Updated group',
            'remove_avatar' => '1',
        ]
    )->assertSuccessful();

    expect($this->conversation->fresh()->avatar)->toBeNull();
});

it('does not allow a non-member to update a group conversation', function (): void {
    $outsider = User::create([
        'code' => 'ADM-'.fake()->unique()->numerify('########'),
        'email' => fake()->unique()->safeEmail(),
        'password' => 'password',
        'display_name' => fake()->name(),
        'role' => Role::ADMIN,
    ]);

    $this->actingAs($outsider)
        ->post(route('convo.update', ['convo' => $this->conversation]), [
            'name' => 'Unauthorized name',
        ])
        ->assertForbidden();

    expect($this->conversation->fresh()->name)->toBeNull();
});
