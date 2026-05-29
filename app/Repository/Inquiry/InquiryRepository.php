<?php

namespace App\Repository\Inquiry;

use App\Models\Inquiry;
use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class InquiryRepository
{
    public function createClientInquiry(array $inquiry)
    {
        return DB::transaction(function () use ($inquiry) {
            return Inquiry::create($inquiry);
        });
    }

    public function deleteInquiry(int $id)
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->delete();
    }

    public function getAllInquiries()
    {
        return Inquiry::orderBy('updated_at', 'desc')->get();
    }



    public function getInquiryById(int $id)
    {
        return Inquiry::findOrFail($id);
    }

    public function toggleStatus(int $id, string $status)
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->status = $status;
        $inquiry->save();
    }
}
