<?php

namespace App\Repository\Admin;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdminRepository
{
    public function getAdminAccountById(int $id)
    {
        return User::findOrFail($id);
    }

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

    public function updateAdminAvatar(int $id, object $file): string
    {
        $folderPath = "upload/user/admin/{$id}";

        Storage::disk('public')->delete(Storage::disk('public')->files($folderPath));

        return $file->store($folderPath, 'public');
    }



    public function updateAdminAccountStatus(int $id, string $status)
    {
        return DB::transaction(function () use ($id, $status) {
            $admin = User::findOrFail($id);
            $admin->status = $status;
            $admin->save();

            return $admin;
        });
    }


    public function updateAdminAccount(int $id, array $data): User
    {
        return DB::transaction(function () use ($id, $data) {
            $admin = User::findOrFail($id);

            if (! empty($data['avatar'])) {
                $data['avatar'] = $this->updateAdminAvatar($id, $data['avatar']);
            }else {
                unset($data['avatar']);
            }

            $admin->update($data);

            return $admin->fresh();
        });
    }

}