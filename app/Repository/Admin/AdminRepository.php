<?php

namespace App\Repository\Admin;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class AdminRepository
{
    public function getAllAdminAccount()
    {
        return User::orderBy('updated_at', 'desc')->get();
    }

    public function createAdminAccount(array $data)
    {
        return DB::transaction(function () use ($data) {
            // 1. Create the user first to generate the ID
            // (Make sure 'avatar' is nullable in your migration, or omit it here)
            $image = $data['avatar'] ?? null;
            unset($data['avatar']);
            $user = User::create($data);

            // 2. Check if an avatar was actually uploaded
            if (isset($image)) {
                $path = $this->storeAdminAvatar($user->id, $image);
                $user->update(['avatar' => $path]);
            }

            return $user;
        });
    }

    public function storeAdminAvatar(int $id, object $file): string
    {

        $folderPath = "upload/user/admin/{$id}";
        return $file->store($folderPath, 'public');
    }
}